import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

const styling = {
    display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1rem',
}

function TransactionTable({ transactions, addTransaction }) {
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    let filteredData = transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.type.includes(typeFilter));

    let sortedData = filteredData.sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        }
        else if (sortKey === "amount") {
            return a.amount - b.amount;
        }
        else {
            return 0;
        }
    });

    function exportToCsv() {
        const csv = unparse({
            fields: ["name", "type", "tag", "date", "amount"],
            data: transactions,
        });
        const data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const csvURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = "transaction.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importFromCsv(event) {
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {

                    console.log("RESULTS>>>", results)
                    //Now results.data is an array of objects representing your CSV rows
                    for (const transaction of results.data) {
                        //Write each transaction to firebase, you can use the addTransaction function here
                        console.log("Transactions", transaction);
                        const newTransaction = {
                            ...transaction,
                            amount: parseFloat(transaction.amount),
                        }
                        await addTransaction(newTransaction, true);
                    }
                }
            })
            event.target.files = null;
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div style={{ width: "95%", padding: "0rem 2rem" }} className='table-content'>
            <h3 style={{textAlign:"center", margin:"20px"}}>My Transactions</h3>

            <div style={styling}>
                <div className='input-flex'>
                    <img src='' width="16" />
                    <input placeholder="Search By Name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select
                    className='select-input'
                    onChange={(value) => setTypeFilter(value)}
                    placeholder="All"
                    allowClear
                >
                    <Option value="">All</Option>
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                </Select>
            </div>

            <div style={styling} className='table-data'>
                <div>
                    <Radio.Group
                        className='input-radio'
                        onChange={(e) => setSortKey(e.target.value)}
                        value={sortKey}
                    >
                        <Radio.Button value="">No Sort</Radio.Button>
                        <Radio.Button value="date">Sort by Date</Radio.Button>
                        <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={styling}>
                    <button className='btn' onClick={exportToCsv}>
                        Export To CSV
                    </button>
                    <label htmlFor='file-csv' className='btn btn-blue'>
                        Import from CSV
                    </label>
                    <input
                        onChange={importFromCsv}
                        id='file-svc'
                        type='file'
                        accept='.csv'
                        required
                        style={{ display: "none" }}
                    />
                </div>
            </div>
            <div className='main-table'>
                <Table dataSource={sortedData} columns={columns} />
            </div>
        </div>
    )
}

export default TransactionTable
