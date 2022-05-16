import React, { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import Logo from './logo.svg';
import Form from './components/Form';
import List from './components/List';

const ALL_EXPENSES = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleName = event => {
    console.log('Name ', event.target.value);
    setName(event.target.value);
  };

  const handleAmount = event => {
    console.log('Amount ', event.target.value);
    setAmount(event.target.value);
  };

  const handleClearExpenses = () => {
    setExpenses([]);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    //check whether the name is not empty and the amount is not negative
    if (name !== '' && amount > 0) {
      // single expense object
      const expense = { name, amount };
      // do not override previous values in the array
      // use spread operator to access previous values
      setExpenses([...expenses, expense]);

      // clean input fields
      setName('');
      setAmount('');
    } else {
      console.log('Invalid expense name or the amount');
    }
  };

  return (
    <Container className="text-center">
      <Card style={{ marginTop: 20 }}>
        <h3 className="display-6">
          Expense Tracker React App
          <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        </h3>
        <div>
          <p>
            Total Expense:{' '}
            <span className="text-success">
              ${' '}
              {expenses.reduce((accumulator, currentValue) => {
                return (accumulator += parseInt(currentValue.amount));
              }, 0)}
            </span>
          </p>
        </div>
      </Card>
      <Form
        name={name}
        amount={amount}
        handleName={handleName}
        handleAmount={handleAmount}
        handleSubmitForm={handleSubmitForm}
        handleClearExpenses={handleClearExpenses}
      />
      <List expenses={expenses} />
    </Container>
  );
}

export default App;
