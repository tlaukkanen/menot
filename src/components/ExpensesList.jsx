import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

function ExpensesList(props) {
  const { expenses, categories } = props

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">€</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses && expenses.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{categories.filter((c) => c.name === row.category)[0]?.icon}&nbsp;{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
          {expenses && (
            <TableRow key="totalrow">
              <TableCell
                colSpan={2}
              >
                Total
              </TableCell>
              <TableCell align="right">
                {expenses.reduce((a, b) => a?.amount + b?.amount, 0)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ExpensesList.defaultProps = {
  expenses: [],
  categories: [],
}

ExpensesList.propTypes = {
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
}

export default ExpensesList
