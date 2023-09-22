import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpense from '../components/Modals/AddExpense';
import AddIncome from '../components/Modals/AddIncome';
import { addDoc, collection, getDocs, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionTable from '../components/TransactionTable';
import ChartComponent from '../components/Charts';
import NoTransaction from '../components/NoTransaction';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const navigate = useNavigate();

  if(!user){
    navigate('/');
  }

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      // console.log('Document written with ID: ', docRef.id)
      if(!many) toast.success("Transaction Added!");
      let newArray = transactions;
      newArray.push(transaction);
      setTransactions(newArray);
      calculateAll();
    }
    catch (e) {
      if(!many) toast.error(e.message);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateAll();
  }, [transactions]);

  function calculateAll(){
    let totalExpenses = 0;
    let totalIncomes = 0;
    
    transactions.forEach((transaction) =>{
      if(transaction.type === 'income'){
        totalIncomes += transaction.amount;
      }
      else{
        totalExpenses += transaction.amount;
      }
    });

    setIncome(totalIncomes);
    setExpense(totalExpenses);
    // console.log(totalIncomes-totalExpenses);
    setCurrentBalance(totalIncomes-totalExpenses);
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetch!");
      // console.log("All Data>>>", transactionsArray);
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
  }
  );

  const confirm = Modal.confirm;

  function handleResetTransaction() {
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'This action cannot be undone.',
      onOk() {
        // Delete user's transaction data
        const transactionsRef = collection(db, `users/${user.uid}/transactions`);
        // ^ Use collection() to reference the "transactions" subcollection
        deleteCollection(transactionsRef)
          .then(() => {
            fetchTransactions();
            toast.success('Transactions deleted successfully.');
          })
          .catch((error) => {
            toast.error('Error deleting transactions:', error);
          });
      },
      onCancel() {
      },
    });
  }

  async function deleteCollection(collectionRef) {
    const querySnapshot = await getDocs(collectionRef);
  
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  return (
    <div>
      {
        loading ? (<p>Loading...</p>) :
          (
            <>
              <Header />
              <Cards
                expense={expense}
                income={income}
                currentBalance={currentBalance}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
                showConfirm={handleResetTransaction}
              />
              { transactions && transactions.length !== 0 ? (
                <ChartComponent sortedTransactions={sortedTransactions} />
                ) : <NoTransaction />
              }
              
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

              <TransactionTable transactions={transactions} addTransaction={addTransaction} />
            </>
          )
      }
    </div>
  )
}

export default Dashboard
