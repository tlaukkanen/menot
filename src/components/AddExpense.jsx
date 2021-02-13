import React, { useState } from 'react'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import AddIcon from '@material-ui/icons/AddCircle'
import PropTypes from 'prop-types'

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  formField: {
    width: '100px',
    marginRight: '16px',
  },

}))

const emptyExpense = {
  category: '',
  comment: '',
  amount: 0,
}

function AddExpense(props) {
  const { register, handleSubmit } = useForm()
  const classes = useStyles()
  const [expense, setExpense] = useState(emptyExpense)
  const { newExpense } = props

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    newExpense(data.category, data.amount, new Date())
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          inputRef={register}
          className={classes.formField}
          name="category"
          label="Category"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          inputRef={register}
          className={classes.formField}
          name="comment"
          label="Comment"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          inputRef={register}
          className={classes.formField}
          name="amount"
          label="Amount"
          InputLabelProps={{
            shrink: true,
            startadornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <IconButton size="medium" type="submit">
          <AddIcon />
        </IconButton>
      </form>
    </>
  )
}

AddExpense.propTypes = {
  newExpense: PropTypes.func.isRequired,
}

export default AddExpense
