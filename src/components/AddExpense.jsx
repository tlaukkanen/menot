import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { v1 as uuid } from 'uuid'

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  expenseDialog: {
    minWidth: '320px',
  },

  title: {
    fontSize: 14,
  },
}))

const currentDate = new Date()

function AddExpense(props) {
  const { register, handleSubmit, control } = useForm()
  const classes = useStyles()
  const theme = useTheme()
  const {
    newExpense, categories, open, handleCancel,
  } = props

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))

    const id = data.id ?? uuid()
    const date = data.date ?? new Date()

    newExpense(id, data.category, data.description, parseFloat(data.amount), date)
  }

  return (
    <Dialog
      open={open}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Add new expense</DialogTitle>
        <DialogContent
          className={classes.expenseDialog}
        >
          <Grid
            container
            direction="column"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="description"
                label="Description"
                type="date"
                defaultValue={`${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <FormControl
                fullWidth
              >
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                name="description"
                label="Description"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  inputRef={register({
                    valueAsNumber: true,
                  })}
                  name="amount"
                  label="Amount"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

AddExpense.defaultProps = {
  open: false,
}

AddExpense.propTypes = {
  newExpense: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
}

export default AddExpense
