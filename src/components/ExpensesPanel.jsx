import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import numeral from 'numeral'

const useStyles = styled(() => ({

  listIcon: {
    fontSize: 18,
  },

  categoryName: {
    fontSize: 14,
  },

}))

function ExpensesPanel(props) {
  const classes = useStyles()
  const { expenses, categories, onRowClick } = props

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">€</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses && expenses.map((row, index) => (
            <TableRow
              key={index}
              onClick={(event) => onRowClick(event, row.id)}
            >
              <TableCell>
                {dayjs(row.date).format('DD/MM')}
              </TableCell>
              <TableCell>
                <Typography className={classes.listIcon}>
                  {categories.filter((c) => c.name === row.category)[0]?.icon}
                  {/*
                  <span className={classes.categoryName}>
                    &nbsp;
                    {row.category}
                  </span>
                  */}
                </Typography>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{numeral(row.amount).format('0.00')}</TableCell>
            </TableRow>
          ))}
          {expenses && (
            <TableRow key="totalrow">
              <TableCell
                colSpan={3}
              >
                Total
              </TableCell>
              <TableCell align="right">
                {numeral(expenses.reduce((sum, row) => sum + (row.amount ? row.amount : 0), 0)).format('0.00')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ExpensesPanel.defaultProps = {
  expenses: [],
  categories: [],
}

ExpensesPanel.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      category: PropTypes.string,
      amount: PropTypes.number,
    }),
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
  ),
  onRowClick: PropTypes.func.isRequired,
}

export default ExpensesPanel
