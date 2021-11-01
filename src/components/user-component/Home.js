import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import Footer from '../global-component/Footer'
import '../../styles/Home.css'
import { getUserDetails } from '../../services/UserService'
import { payment, addAmount, bankTransfer } from '../../services/WalletService'
import { getAccounts } from '../../services/AccountService'

const Home = ({ defaultCardNumber, transactionValue }) => {
    const [user, setUser] = useState({
        userName : '',
        accountBalance : '',
        rewards : '',
        totalTransfers : '',
        totalPayments : '',
        totalBills : '',
        totalServices : '',
        totalInvestments : '',
        totalDonations : '',
        cards : [{
            id : '',
            cardName : '',
            cardBalance : '',
            expiryDate : '',
            defaultCard : ''
        }],
        transactions : [{
            transactionDateTime : '',
            fromAccountId : '',
            fromAccount : '',
            toAccountId : '',
            toAccount : '',
            transactionAmount : '',
            transactionType : '',
            transactionStatus : ''
        }]
    })

    const [accounts, setAccounts] = useState({
        phoneNumber : '',
        userName : '',
        accountType : ''
    })

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        getUserDetails().then(user => setUser(user))
        getAccounts().then(retrievedAccounts => setAccounts(retrievedAccounts))
    }, [])

    const [showAllDetails, setShowAllDetails] = useState(false)
    var displayType = "none"
    var detailsButtonText = "All Details"
    function handleShowAllDetails(e) {
        e.preventDefault()
        setShowAllDetails(!showAllDetails)
    }    
    if(showAllDetails === true) {
        displayType = "block"
        detailsButtonText = "Close"
    }
    
    var defaultCardValue = "-"
    user.cards.find(card => {
        if(card.defaultCard === true) {
            defaultCardValue = card.cardName + " " + card.id
            defaultCardNumber = card.id
        }
        return defaultCardNumber
    })

    try {
        var lastTransaction = user.transactions.slice(0).reverse().find(lastSuccessfulTransaction => lastSuccessfulTransaction.transactionStatus.includes("Success"))
        var transactionMessage = null
        var account = null
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        if(lastTransaction.transactionType.includes("Payment") || lastTransaction.transactionType === "Debited") {
            transactionMessage = "Sent To"
            account = lastTransaction.toAccount
        }
        else if(lastTransaction.transactionType.includes("Debited (Transfer)")) {
            transactionMessage = "Transferred To"
            account = lastTransaction.toAccount
        }
        else if(lastTransaction.transactionType.includes("Bill") || lastTransaction.transactionType.includes("Service")) {
            transactionMessage = "Paid To"
            account = lastTransaction.toAccount
        }
        else if(lastTransaction.transactionType === "Debited (Investment)") {
            transactionMessage = "Invested On"
            account = lastTransaction.toAccount
        }
        else if(lastTransaction.transactionType.includes("Donation")) {
            transactionMessage = "Donated To"
            account = lastTransaction.toAccount
        }
        else {
            transactionMessage = "Recieved From"
            account = lastTransaction.fromAccount
        }
        var dt = lastTransaction.transactionDateTime.substr(0, lastTransaction.transactionDateTime.indexOf(','))
        var yr = 20 + dt.substr(6, dt.indexOf('-'))
        var mt = dt.substr(3, dt.indexOf('-'))
        var dy = dt.substr(0, dt.indexOf('-'))
        var dtString = yr + "-" + mt + "-" + dy
        var d = new Date(dtString)
        var dayName = dayNames[d.getDay()]
        if(lastTransaction !== null) {
            //eslint-disable-next-line
            transactionValue = "₹" + " " + lastTransaction.transactionAmount + " " + transactionMessage + " " + account + " On " + dayName + ", " + lastTransaction.transactionDateTime
        }
    }
    catch(e) {
        transactionValue = "-"
    }

    function handleAddAmount(e) {
        e.preventDefault()
        if(defaultCardNumber !== null) {            
            var amount = prompt('Enter The Amount To Be Added')
            if(amount !== "" && amount !== null) {
                addAmount(defaultCardNumber, amount)
            }                
        }
        else {
            alert("No Cards In The Account")
        }     
    }

    function handleBankTransfer(e) {
        e.preventDefault()
        if(defaultCardNumber !== null) {
            var amount = prompt('Enter The Amount To Be Transferred')
            if(amount !== "" && amount !== null) {                
                bankTransfer(defaultCardNumber, amount)
            }
        }
        else {
            alert("No Cards In The Account")
        }     
    }

    function handlePayment(transferPhoneNumber, transferAccountType, transferAccountName) {
        var amount = prompt('Enter The Amount To Be Paid')
        if(amount !== "" && amount !== null) {                
            payment(transferPhoneNumber, amount, transferAccountType, transferAccountName)
        }        
    }

    return (
        <div className="bg-dark pb-3" style={{ fontFamily: "serif" }}>
            <Header name={user.userName}/>
            <div className="container">
                <div className="d-block text-center text-md-start mt-md-3 mx-md-5">
                    <p className="mb-0 home-links-active d-inline-block">Wallet</p>
                    <a href="/cards" className="home-links d-inline-block mx-4">Cards</a>
                    <a href="/transactions" className="home-links  d-inline-block">Transactions</a>
                </div>
            </div>
            <div className="container mt-4">
                <button className="btn btn-outline-danger rounded-3 border-2 px-3 ms-md-5 d-block mx-auto mx-md-0" data-bs-toggle="modal" data-bs-target="#newPaymentModal"><b>New Payment</b></button>
                <div className="modal fade" id="newPaymentModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark border-2 border-danger mx-3">
                            <div className="modal-header border-2 border-danger">
                                <h5 className="modal-title text-warning"><b>New Payment</b></h5>
                                <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body text-white">
                                <input className="payment-field" placeholder="Search....." onChange={e => {setSearchTerm(e.target.value)}}></input>
                                <p className="text-warning mt-3">Total No Of Users : {Object.keys(accounts).length}</p>
                                {// eslint-disable-next-line
                                Array.isArray(accounts) && accounts.filter((acc) => {
                                    if(
                                        acc.phoneNumber.includes(searchTerm) ||
                                        acc.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        acc.accountType.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    return acc
                                    }).map((acc) => {
                                        var paymentButtonText = "Pay"
                                        if(acc.accountType === "Investment") {
                                            paymentButtonText = "Invest"
                                        }
                                        else if(acc.accountType === "Charity") {
                                            paymentButtonText = "Donate"
                                        }
                                        else if(acc.accountType === "Personal") {
                                            paymentButtonText = "Transfer"
                                        }
                                        return(
                                            <div className="mt-3 text-warning border border-2 rounded-3 border-danger py-2" key={acc.phoneNumber}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-1 ms-3">Phone : {acc.phoneNumber}</p>
                                                        <p className="mb-1 ms-3">Name : {acc.userName}</p>
                                                        <p className="mb-1 ms-3">Type : {acc.accountType}</p>
                                                    </div>
                                                    <div className="col-md-6 text-start ms-md-0 ms-2 mb-md-0 mb-2 text-md-center mt-2 mt-md-3">
                                                        <button onClick={e => handlePayment(acc.phoneNumber, acc.accountType, acc.userName)} className="btn border-2 border-warning btn-outline-warning my-auto">{paymentButtonText}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }).slice(0, 3)
                                }
                            </div>
                            <div className="modal-footer border-2 border-danger mt-3">
                                <button className="btn btn-outline-danger border border-2 border-danger" data-bs-dismiss="modal"><b>Close</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="border border-danger border-3 rounded-3 mx-md-5 text-warning pb-4 mt-4 mb-4 mb-lg-5">
                    <h4 className="text-center mt-3 mb-4" style={{ textUnderlineOffset: "7px" }}><u><b>My E-Wallet</b></u></h4>
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-0">Account Balance : ₹{Math.round(user.accountBalance * 100) / 100}</p>
                        </div>
                        <div className="col-md-6 my-md-auto text-start text-md-end mt-2">
                            <p className="wallet-fields d-inline-block ms-3 ms-md-0 me-5 mb-0">Rewards Earned : ₹{Math.round(user.rewards * 100) / 100}</p>
                        </div>
                        <div className="col-12 textstart">
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-0 mt-2 mt-md-3">Default Card : {defaultCardValue}</p>
                        </div>
                        <div className="col-12 text-start">
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-0 mt-2 mt-md-3">Last Transaction : {transactionValue}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 text-start" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-md-0 mb-1 mt-2 mt-md-3">Total Transfers : ₹{user.totalTransfers}</p>
                        </div>
                        <div className="col-lg-4 col-md-6 my-md-auto text-start text-lg-center mt-1 mt-md-3" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-md-0 mb-1">Total Payments : ₹{Math.round(user.totalPayments * 100) / 100}</p>
                        </div>
                        <div className="col-lg-4 col-md-6 my-md-auto text-start text-lg-end mt-1 mt-md-3" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 me-5 mb-md-0 mb-1">Total Bills : ₹{Math.round(user.totalBills * 100) / 100}</p>
                        </div>
                        <div className="col-lg-4 col-md-6 text-start" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-md-0 mb-1 mt-2 mt-md-3">Total Investments : ₹{Math.round(user.totalInvestments * 100) / 100}</p>
                        </div>
                        <div className="col-lg-4 col-md-6 my-md-auto text-start text-lg-center mt-1 mt-md-3" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 mb-md-0 mb-1">Total Services : ₹{Math.round(user.totalServices * 100) / 100}</p>
                        </div>
                        <div className="col-lg-4 col-md-6 my-md-auto text-start text-lg-end mt-1 mt-md-3" style={{display: displayType}}>
                            <p className="wallet-fields d-inline-block ms-3 ms-md-5 me-5 mb-md-0 mb-1">Total Donations : ₹{Math.round(user.totalDonations * 100) / 100}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <button className="btn btn-outline-warning rounded-3 border-2 px-md-5 px-4 mt-4 ms-5 mx-5" onClick={(e) => handleShowAllDetails(e)}><b>{detailsButtonText}</b></button>
                        </div>
                        <div className="col-md-6 my-md-auto text-center text-md-end mt-3 mt-md-4">
                            <button className="add-money btn btn-outline-warning rounded-3 border-2 px-4 me-lg-4 me-md-5 me-2" onClick={(e) => handleAddAmount(e)}><b>Add Money</b></button>
                            <button className="bank-transfer btn btn-outline-warning rounded-3 border-2 px-3 me-lg-5 me-md-5 mt-lg-0 mt-md-3" onClick={(e) => handleBankTransfer(e)}><b>Bank Transfer</b></button>
                        </div>  
                    </div>             
                </div>
            </div>
            <Footer name={user.userName}/>
        </div>
    )
}

Home.defaultProps = {
    defaultCardNumber: null,
    transactionValue: null
}

export default Home
