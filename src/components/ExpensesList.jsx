import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

function ExpensesList(props) {
  const { expenses } = props

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">€</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses && expenses.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ExpensesList.propTypes = {
  expenses: PropTypes.array,
}

export default ExpensesList