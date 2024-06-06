import React, { useState, useEffect } from 'react'
import './App.css'
import {
  AppBar, Box, Button, Fab, Grid, Tab, Tabs,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import store from 'store'
import AddExpense from './components/AddExpense'
import ExpensesPanel from './components/ExpensesPanel'
import ConfigPanel from './components/ConfigPanel'
import AddCategoryPanel from './components/AddCategoryPanel'

const useStyles = styled((theme) => ({

  tab: {
    width: '100px',
  },

  fab: {
    position: 'sticky',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  paper: {
    padding: theme.spacing(2),
  },

}))

function App() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)

  useEffect(() => {
    const data = store.get('data')
    if (data) {
      setExpenses(data)
    }
  }, [setExpenses])

  useEffect(() => {
    const data = store.get('categories')
    if (data) {
      setCategories(data)
    } else {
      setCategories([
        { name: 'Groceries', icon: '🛍' },
        { name: 'Car', icon: '🚗' },
        { name: 'Hobbies', icon: '⚽' },
        { name: 'Lunch', icon: '🍽️' },
        { name: 'Housing', icon: '🏠' },
        { name: 'Well-being', icon: '🏋️‍♂️' },
        { name: 'Entertainment', icon: '🍿' },
        { name: 'Extra', icon: '🍬' },
      ])
    }
  }, [setCategories])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const newExpense = (id, category, description, amount, date) => {
    console.log(`Adding new item: ${id} ${category} ${description} ${amount} ${date}`)
    setShowExpenseDialog(false)
    const newExpenses = [{
      id,
      category,
      description,
      amount,
      date,
    }, ...expenses]
    setExpenses(newExpenses)
    store.set('data', newExpenses)
  }

  const clearData = () => {
    store.set('data', [])
    setExpenses([])
  }

  const showExpense = (expenseId) => {
    const expense = expenses.find((exp) => exp.id === expenseId)
    setSelectedExpense(expense)
    setShowExpenseDialog(true)
  }

  const newCategory = (name, icon) => {
    const newCategories = [...categories, {
      name,
      icon,
    }]
    setCategories(newCategories)
    store.set('categories', newCategories)
  }

  const removeCategory = (name) => {
    const newCategories = categories.filter((c) => c.name !== name)
    setCategories(newCategories)
    store.set('categories', newCategories)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Menot 💸</p>
      </header>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="App sections"
          centered
          textColor="white"
          indicatorColor="secondary"
        >
          <Tab className={classes.tab} label="Expenses" />
          <Tab className={classes.tab} label="Stats" />
          <Tab className={classes.tab} label="File" />
          <Tab className={classes.tab} label="Categories" />
        </Tabs>
      </AppBar>
      <div hidden={value !== 0}>
        <Box m={2} />
        <AddExpense
          open={showExpenseDialog}
          handleCancel={() => setShowExpenseDialog(false)}
          categories={categories}
          newExpense={(category, desc, amount, date) => newExpense(category, desc, amount, date)}
        />
        <Box m={1} />
        <ExpensesPanel
          expenses={expenses}
          categories={categories}
          onRowClick={(event, rowId) => showExpense(rowId)}
        />
        <Fab
          aria-label="Add expense"
          className={classes.fab}
          onClick={() => setShowExpenseDialog(true)}
          color="primary"
        >
          <AddIcon />
        </Fab>
      </div>
      <div hidden={value !== 1}>
        Stats
      </div>
      <div hidden={value !== 2}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          className={classes.paper}
        >
          <Grid item>
            <Button
              onClick={() => clearData()}
              variant="contained"
              color="secondary"
            >
              CLEAR DATA
            </Button>
          </Grid>
        </Grid>
      </div>
      <div hidden={value !== 3}>
        <Box m={2} />
        <AddCategoryPanel
          newCategory={(name, icon) => newCategory(name, icon)}
          handleClose={() => setShowCategoryDialog(false)}
          open={showCategoryDialog}
        />
        <ConfigPanel
          categories={categories}
          removeCategory={(name) => removeCategory(name)}
        />
      </div>
    </div>
  )
}

export default App
