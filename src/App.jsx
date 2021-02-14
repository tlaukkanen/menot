import React, { useState, useEffect } from 'react'
import './App.css'
import {
  AppBar, Box, Tab, Tabs,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import store from 'store'
import AddExpense from './components/AddExpense'
import ExpensesList from './components/ExpensesList'
import ConfigPanel from './components/ConfigPanel'
import AddCategoryPanel from './components/AddCategoryPanel'

const useStyles = makeStyles(() => ({

  tab: {
    width: '100px',
  },

}))

function App() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const data = store.get('data')
    if (data) {
      setExpenses(data)
    }
  }, [setExpenses])

  useEffect(() => {
    const data = store.get('categories')
    if(data) {
      setCategories(data)
    } else {
      setCategories([
        { name: 'Groceries', icon: '🛍' },
        { name: 'Car', icon: '🚗' },
        { name: 'Hobbies', icon: '⚽' },
      ])
    }
  }, [setCategories])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const newExpense = (category, description, amount, date) => {
    console.log('Adding new item: ' + category + ' ' + description + ' ' + amount + ' ' + date)
    const newExpenses = [{
      category,
      description,
      amount,
      date,
    }, ...expenses]
    setExpenses(newExpenses)
    store.set('data', newExpenses)
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
    const newCategories = categories.filter(c => c.name !== name)
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
          categories={categories}
          newExpense={(category, desc, amount, date) => newExpense(category, desc, amount, date)}
        />
        <Box m={1} />
        <ExpensesList
          expenses={expenses}
          categories={categories}
        />
      </div>
      <div hidden={value !== 1}>
        Stats
      </div>
      <div hidden={value !== 3}>
        <Box m={2} />
        <AddCategoryPanel
          newCategory={(name, icon) => newCategory(name, icon)}
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
