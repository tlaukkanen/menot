import React, { useState } from 'react'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import AddIcon from '@material-ui/icons/AddCircle'
import PropTypes from 'prop-types'

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  formField: {
    width: '100px',
    marginRight: '16px',
  },

  amountField: {
    width: '80px',
  },

  expensePaper: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 14,
  },
}))

function AddExpense(props) {
  const { register, handleSubmit, control } = useForm()
  const classes = useStyles()
  const { newExpense, categories } = props

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    newExpense(data.category, data.description, data.amount, new Date())
  }

  return (
    <Paper className={classes.expensePaper}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Add new expense
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <InputLabel
            shrink
          >
            Category
          </InputLabel>
          <Controller
            control={control}
            name="category"
            defaultValue=""
            as={(
              <Select
                className={classes.formField}
                id="category-select"
              >
                {categories && categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.icon}
                    &nbsp;
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <TextField
          inputRef={register}
          className={classes.formField}
          name="description"
          label="Description"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl>
          <TextField
            inputRef={register}
            className={classes.amountField}
            name="amount"
            label="Amount"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />
        </FormControl>
        <IconButton size="medium" type="submit">
          <AddIcon />
        </IconButton>
      </form>
    </Paper>
  )
}

AddExpense.propTypes = {
  newExpense: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
  ).isRequired,
}

export default AddExpense
