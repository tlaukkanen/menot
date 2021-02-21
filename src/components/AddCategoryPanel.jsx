import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, Paper, TextField, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import AddIcon from '@material-ui/icons/AddCircle'
import PropTypes from 'prop-types'

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  formField: {
    width: '100px',
    marginRight: '16px',
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

const emptyCategory = {
  name: '',
  icon: '',
}

function AddCategoryPanel(props) {
  const { register, handleSubmit } = useForm()
  const classes = useStyles()
  const [category, setCategory] = useState(emptyCategory)
  const { newCategory, open, handleClose } = props

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    newCategory(data.name, data.icon)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Add new category
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Paper className={classes.expensePaper}>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              inputRef={register}
              className={classes.formField}
              name="name"
              label="Name"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              inputRef={register}
              className={classes.formField}
              name="icon"
              label="Icon"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <IconButton size="medium" type="submit">
              <AddIcon />
            </IconButton>
          </form>
        </Paper>
      </DialogContent>
    </Dialog>
  )
}

AddCategoryPanel.defaultProps = {
  open: false,
}

AddCategoryPanel.propTypes = {
  newCategory: PropTypes.func.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
}

export default AddCategoryPanel
