import { Line, Pie } from '@ant-design/plots';
import React from 'react'



function ChartComponent({ sortedTransactions }) {

    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    const spendingData = sortedTransactions.filter(
        (transaction) => {
            if (transaction.type === "expense") {
                return { tag: transaction.tag, amount: transaction.amount }
            }
    });

    // let finalSpendings = spendingData.reduce((acc, obj) => {
    //     let key = obj.tag;
    //     if (!acc[key]) {
    //         acc[key] = { tag: obj.tag, amount: obj.amount };
    //     }
    //     else {
    //         acc[key].amount += obj.amount;
    //     }
    //     return acc;
    // }, {});

    // console.log("Spending Data >>>",finalSpendings);

    let newSpendings = [
        { tag: "Clothings", amount: 0 },
        { tag: "Bills", amount: 0 },
        { tag: "Education", amount: 0 },
        { tag: "Food", amount: 0 },
        { tag: "Office", amount: 0 },

    ]
    spendingData.forEach((item) => {
        if (item.tag === "Clothings") {
            newSpendings[0].amount += item.amount;
        }
        else if (item.tag === "Bills") {
            newSpendings[1].amount += item.amount;
        }
        else if (item.tag === "Education") {
            newSpendings[2].amount += item.amount;
        }
        else if (item.tag === "Food") {
            newSpendings[3].amount += item.amount;
        }
        else {
            newSpendings[4].amount += item.amount;
        }

    })

    const config = {
        data: data,
        width: 700,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        // point: {
        //     size: 5,
        //     shape: 'circle',
        // },
    };

    const spendingConfig = {
        data: newSpendings,
        weidth: 400,
        autoFit: true,
        angleField: 'amount',
        colorField: 'tag',
    }

    let chart;

    let pieChart;


    return (
        <div className='chart-wrapper'>
            <div className='graph'>
                <h3>My Analytics</h3>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div className='pie-chart'>
                <h3>My Spendings</h3>
                <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
            </div>
        </div>
    )
}

export default ChartComponent

