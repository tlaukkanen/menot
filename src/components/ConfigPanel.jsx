import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Trashcan from '@material-ui/icons/Delete'
import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'


const useStyles = makeStyles(() => ({

  iconColumn: {
    width: '32px',
  },

}))

function ConfigPanel(props) {
  const { categories, removeCategory } = props
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Name</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {categories && categories.map((row) => (
            <TableRow key={row.name}>
              <TableCell padding="checkbox">
                {row.icon}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right" padding="checkbox">
                <IconButton onClick={() => removeCategory(row.name)}>
                  <Trashcan />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ConfigPanel.defaultProps = {
  categories: [],
}

ConfigPanel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
  ),
  removeCategory: PropTypes.func.isRequired,
}

export default ConfigPanel
