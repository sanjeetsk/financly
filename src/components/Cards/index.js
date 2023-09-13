import React from 'react'
import './style.css';
import { Card, Row } from 'antd';
import Button from '../Button'

function Cards({showExpenseModal, showIncomeModal, income, expense, currentBalance}) {
  return (
    <div>
      <Row className='my-row'>
        <Card className='my-card' bordered={true}>
            <h2>Current Balace</h2>
            <p>₹{currentBalance}</p>
            <Button text={"Reset Balance"} blue={true} />
        </Card>

        <Card className='my-card' bordered={true}>
            <h2>Total Income</h2>
            <p>₹{income}</p>
            <Button text={"Add Income"} blue={true} onClick={showIncomeModal}/>
        </Card>

        <Card className='my-card' bordered={true}>
            <h2>Total Expenses</h2>
            <p>₹{expense}</p>
            <Button text={"Add Expenses"} blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  )
}

export default Cards
