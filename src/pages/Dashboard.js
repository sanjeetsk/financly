import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpense from '../components/Modals/AddExpense';
import AddIncome from '../components/Modals/AddIncome';
import moment from 'moment/moment';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal  = () =>{
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal = () =>{
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel = () =>{
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type)=>{
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction){
    try{
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log('Document written with ID: ', docRef.id)
      toast.success("Transaction Added!");
    }
    catch(e){
      toast.error(e.message);
    }
  }
 
  return (
    <div>
      <Header />
      <Cards 
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />

      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      /> 
    </div>
  )
}

export default Dashboard
