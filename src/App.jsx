import React, { useState, useEffect } from 'react'
import './App.css'
import {
  AppBar, Box, Tab, Tabs,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import store from 'store'
import AddExpense from './components/AddExpense'
import ExpensesList from './components/ExpensesList'

const useStyles = makeStyles(() => ({

  tab: {
    width: '100px',
  },

}))

function App() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    let data = store.get('data')
    if (data) {
      setExpenses(data)
    }
  }, [setExpenses])

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const newExpense = (description, amount, date) => {
    console.log('Adding new item: ' + description + " " + amount + " " + date)
    const newExpenses = [...expenses, {
      description,
      amount,
      date,
    }]
    setExpenses(newExpenses)
    store.set('data', newExpenses)
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
        </Tabs>
      </AppBar>
      <div hidden={value !== 0}>
        <Box m={2} />
        <AddExpense newExpense={(desc, amount, date) => newExpense(desc, amount, date)} />
        <Box m={1} />
        <ExpensesList expenses={expenses} />
      </div>
      <div hidden={value !== 1}>
        Stats
      </div>
    </div>
  )
}

export default App
