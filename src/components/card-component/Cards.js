import React, {useState, useEffect } from 'react'
import Header from '../global-component/Header'
import Footer from '../global-component/Footer'
import { getUserDetails } from '../../services/UserService'
import { addCard, updateCard, deleteCard } from '../../services/CardService'
import { addAmount, bankTransfer } from '../../services/WalletService'
import '../../styles/Cards.css'

const Cards = () => {
    const [user, setUser] = useState({
        userName : '',
        cards : [{
            id : '',
            cardName : '',
            cardBalance : '',
            expiryDate : '',
            defaultCard : ''
        }]
    })

    const [card, setCard] = useState({
        cards : [{
            id : '',
            cardName : '',
            cardBalance : '',
            expiryDate : '',
            defaultCard : ''
        }]
    })

    const [data, setData] = useState({
        cardNumber : '',
        cardName : '',
        expiryMonth : '',
        expiryYear : '',
        cvv : ''
    })

    useEffect(() => {
        getUserDetails().then(user => setUser(user))
        getUserDetails().then(user => setCard({ cards: user.cards }))
    }, [])

    function handleChange(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleAddCard(e) {
        e.preventDefault()
        addCard(data.cardNumber, data.cardName, data.expiryMonth, data.expiryYear, data.cvv)
    }

    function handleUpdateDefaultCard(cardNumber) {
        updateCard(cardNumber)
    }

    function handleDeleteCard(cardNumber) {
        var confirmDelete = window.confirm("Are You Sure You Want To Delete Card ?")
        if(confirmDelete === true) {
            deleteCard(cardNumber)
        }
        
    }

    function handleAddAmount(cardNumber) {
        var amount = prompt('Enter The Amount To Be Added')
        if(amount !== "" && amount !== null) {            
            addAmount(cardNumber, amount)
        }   
    }

    function handleBankTransfer(cardNumber) {
        var amount = prompt('Enter The Amount To Be Transferred')
        if(amount !== "" && amount !== null) {
            bankTransfer(cardNumber, amount)
        } 
    }

    return (
        <div className="bg-dark pb-4" style={{ fontFamily: "serif" }}>
            <Header name={user.userName}/>
            <div className="container">
                <div className="d-block text-center text-md-start mt-0 mt-md-3 mx-0 mx-md-5">
                    <a href="/home" className="home-links d-inline-block">Wallet</a>
                    <p className="home-links-active d-inline-block mx-4">Cards</p>
                    <a href="/transactions" className="mb-0 home-links d-inline-block">Transactions</a>
                </div>
            </div>
            <div className="container mt-2">
                <button className="btn btn-outline-danger rounded-3 border-2 px-3 ms-md-5 d-block mx-auto mx-md-0" data-bs-toggle="modal" data-bs-target="#addCardModal"><b>Add New Card</b></button>
                <p className="text-warning mt-4 ms-md-5 text-md-start text-center"><b>Total No Of Cards : {Object.keys(card.cards).length}</b></p>
                <div className="modal fade" id="addCardModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark border-2 border-danger mx-3">
                            <div className="modal-header border-2 border-danger">
                                <h5 className="modal-title text-warning"><b>Add New Card</b></h5>
                                <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3" autoComplete="off">
                                    <input placeholder="Card Number" onChange={(e) => handleChange(e)} id="cardNumber" type="number" className="card-input-fields" required />
                                    <input placeholder="Bank Name" onChange={(e) => handleChange(e)} id="cardName" type="text" className="card-input-fields mt-4" required maxLength="15" />
                                    <input placeholder="Expiry Month" onChange={(e) => handleChange(e)} id="expiryMonth" type="number" className="card-input-fields mt-4" required />
                                    <input placeholder="Expiry Year" onChange={(e) => handleChange(e)} id="expiryYear" type="number" className="card-input-fields mt-4" required />
                                    <input placeholder="Cvv" onChange={(e) => handleChange(e)} id="cvv" type="password" className="card-input-fields mt-4" required maxLength="3" />
                                </form>
                            </div>
                            <div className="modal-footer border-2 border-danger mt-4">
                                <button onClick={(e) => handleAddCard(e)} type="submit" className="btn btn-outline-warning border border-2 border-warning"><b>Submit</b></button>
                                <button className="btn btn-outline-danger border border-2 border-danger" data-bs-dismiss="modal"><b>Close</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-4">
                <div className="border border-danger border-3 rounded-3 mx-md-5 pb-4">
                    <h4 className="text-danger text-center mt-3" style={{ textUnderlineOffset: "7px" }}><u><b>My Cards</b></u></h4>
                    {card.cards.map((card, i) => {
                        var borderDesign = "2px solid #dc3545"
                        var defaultCardDisplay = "none"
                        var nonDefaultCardDisplay = "block"
                        var buttonsDisplay = "block"
                        if(card.defaultCard === true) {
                            borderDesign = "3px solid #198754"
                            buttonsDisplay = "none"
                            defaultCardDisplay = "block"
                            nonDefaultCardDisplay = "none"
                        }
                        return (                        
                            <div className="row mt-4" key={i}>
                                <div className="col mx-auto px-5">
                                    <div className="card text-warning" style={{ backgroundColor: "transparent", border: borderDesign }}>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ display: defaultCardDisplay, textUnderlineOffset: "3px", textAlign: "center", paddingBottom: "10px" }}><u><b>Default Card</b></u></h5>
                                            <h5 className="card-title" style={{ display: nonDefaultCardDisplay, textUnderlineOffset: "3px", textAlign: "center", paddingBottom: "10px" }}><u><b>Transaction Card</b></u></h5>
                                            <p className="card-text"><b>Bank : {card.cardName}</b></p>
                                            <p className="card-text"><b>Number : {card.id}</b></p>
                                            <p className="card-text"><b>Expiry : {card.expiryDate}</b></p>
                                            <p className="card-text"><b>Balance : {card.cardBalance}</b></p>
                                            <p className="card-text"><b>Name : {user.userName}</b></p>
                                            <p className="card-text"><b>Cvv : ***</b></p>
                                            <div className="row">
                                                <div className="text-lg-start col-lg-6" style={{ display: buttonsDisplay }}>
                                                    <button onClick={(e) => handleAddAmount(card.id)} className="btn btn-outline-warning border-2 d-inline-block me-2"><b>Add Amount To Wallet</b></button>
                                                    <button onClick={(e) => handleBankTransfer(card.id)} className="btn btn-outline-warning border-2 d-inline-block ms-md-2 mt-3 mt-md-0"><b>Transfer Amount To Bank</b></button>
                                                </div>
                                                <div className="text-lg-start text-lg-end mt-lg-0 mt-3 col-lg-6" style={{ display: buttonsDisplay }}>
                                                    <button onClick={e => handleUpdateDefaultCard(card.id)} className="btn btn-outline-success border-2 d-inline-block me-2"><b>Make Default</b></button>
                                                    <button onClick={e => handleDeleteCard(card.id)} className="btn btn-outline-danger border-2 d-inline-block ms-2"><b>Delete</b></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                     
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cards