import React, {useState, useEffect } from 'react'
import Header from '../global-component/Header'
import Footer from '../global-component/Footer'
import { getUserDetails } from '../../services/UserService'

const Transactions = () => {
    const [user, setUser] = useState({
        userName : '',
        transactions : [{
            transactionDateTime : '',
            fromAccountId : '',
            fromAccount : '',
            toAccountId : '',
            toAccount : '',
            transactionAmount : '',
            transactionType : '',
            transactionReward : '',
            transactionStatus : ''
        }]
    })

    const [transaction, setTransaction] = useState({
            transactions : [{
                transactionDateTime : '',
                fromAccountId : '',
                fromAccount : '',
                toAccountId : '',
                toAccount : '',
                transactionAmount : '',
                transactionType : '',
                transactionReward : '',
                transactionStatus : ''
        }]
    })

    useEffect(() => {
        getUserDetails().then(user => setUser(user))
        getUserDetails().then(user => setTransaction({ transactions : user.transactions }))
    }, [])

    const [visibleTransactions, setVisibleTransactions] = useState(5);
    function handleShowMoreTransactions(e) {
        e.preventDefault()
        setVisibleTransactions(previousVisibleTransactions => previousVisibleTransactions + 5)
    }

    function getResultTransactions(startDate, endDate) {
        var resultTransactions = user.transactions.filter(tdt => {                
            var dt = tdt.transactionDateTime.substr(0, tdt.transactionDateTime.indexOf(','))
            var yr = 20 + dt.substr(6, dt.indexOf('-'))
            var mt = dt.substr(3, dt.indexOf('-'))
            var dy = dt.substr(0, dt.indexOf('-'))
            var dtString = yr + "-" + mt + "-" + dy
            var d = new Date(dtString)

            var matchingDate = new Date(d);
            return (matchingDate <= startDate && matchingDate >= endDate)
        });
        setTransaction({ transactions: resultTransactions })
    }

    function handleChange(e) {
        var todayDate = new Date()
        var startDate = null
        var endDate = null
        if(e.target.value === "All Transactions") {
            setTransaction({ transactions: user.transactions })
        }
        else if(e.target.value === "Last Year's Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 365);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last 9 Months Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 270);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last 6 Months Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 180);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last 3 Months Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 90);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last Month's Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 30);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last 2 Weeks Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 14);
            getResultTransactions(startDate, endDate)
        }
        else if(e.target.value === "Last Week's Transactions") {
            startDate = todayDate
            endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() - 7);
            getResultTransactions(startDate, endDate)
        }
    }

    return (
        <div className="bg-dark pb-lg-3 pb-4" style={{ fontFamily: "serif" }}>
            <Header name={user.userName}/>
            <div className="container">
                <div className="d-block text-center text-md-start mt-0 mt-md-3 mx-0 mx-md-5">
                    <a href="/home" className="home-links d-inline-block">Wallet</a>
                    <a href="/cards" className="home-links d-inline-block mx-4">Cards</a>
                    <p className="mb-0 home-links-active d-inline-block">Transactions</p>
                </div>
            </div>
            <div className="container mt-4 px-5">
                <select defaultValue={"Default"} onChange={(e) => handleChange(e)} className="form-select text-warning" style={{ backgroundColor : "transparent", border: "2px #dc3545 solid", fontWeight : "bold", width : "250px" }}>
                    <option value="Default" disabled>-- Select Transaction Type --</option>
                    <option value="Last Week's Transactions">Last Week's Transactions</option>
                    <option value="Last 2 Weeks Transactions">Last 2 Weeks Transactions</option>
                    <option value="Last Month's Transactions">Last Month's Transactions</option>
                    <option value="Last 3 Months Transactions">Last 3 Months Transactions</option>
                    <option value="Last 6 Months Transactions">Last 6 Months Transactions</option>
                    <option value="Last 9 Months Transactions">Last 9 Months Transactions</option>
                    <option value="Last Year's Transactions">Last Year's Transactions</option>
                    <option value="All Transactions">All Transactions</option>
                </select>
                <p className="text-warning mt-4"><b>Total No Of Transactions : {Object.keys(transaction.transactions).length}</b></p>
            </div>
            <div className="container text-warning mt-4 px-5">
                <table>
                    <tbody>
                        <tr style={{fontSize: "18px"}}>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>S.No</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Date</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>From</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>To</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Amount</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Type</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Reward</th>
                            <th className="border border-danger px-3 pt-2 pb-3" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Status</th>
                        </tr>
                        {transaction.transactions.slice(0).reverse().map((transaction, i) => {
                            return (
                                <tr key={i+1}>
                                    <td className="border border-danger px-3 py-2 text-warning">{i+1}</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.transactionDateTime}</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.fromAccount} ({transaction.fromAccountId})</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.toAccount} ({transaction.toAccountId})</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{Math.round(transaction.transactionAmount * 100) / 100}</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.transactionType}</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.transactionReward}</td>
                                    <td className="border border-danger px-3 py-2 text-warning">{transaction.transactionStatus}</td>
                                </tr>                        
                            );
                        }).slice(0, visibleTransactions)}
                    </tbody>
                </table>
                <button onClick={(e) => handleShowMoreTransactions(e)} className="btn btn-outline-danger border-2 mt-4 d-block px-4 py-2"><b>Show More</b></button>
            </div>
            <div className="d-lg-block mt-4 mt-lg-0">
                <Footer />
            </div>
        </div>
    )
}

export default Transactions
