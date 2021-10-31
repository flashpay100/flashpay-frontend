import Axios from 'axios'

const URL = "https://flashpay-backend.herokuapp.com"

export default function cardService() {
    return "Card Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Add Card *****************************************/
async function addCard(submittedCardNumber, submittedCardName, submittedExpiryMonth, submittedExpiryYear, submittedCvv) {
    var jwt = getJWTToken()
    await Axios.post(URL + "/card/" + jwt, {
        params: { jwtToken: jwt },
        cardNumber: submittedCardNumber,
        cardName : submittedCardName,
        expiryMonth : submittedExpiryMonth,
        expiryYear : submittedExpiryYear,
        cvv: submittedCvv
        })
        .then(response => {
            if(response.status === 201) {
                alert("New Card Added")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Update Card *****************************************/
async function updateCard(submittedCardNumber) {
    var jwt = getJWTToken()
    await Axios.patch(URL + "/card", null, {
        params: { cardNumber: submittedCardNumber, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Default Card Updated")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Delete Card *****************************************/
async function deleteCard(submittedCardNumber) {
    var jwt = getJWTToken()
    await Axios.delete(URL + "/card", {
        params: { cardNumber: submittedCardNumber, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Card Deleted")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

export {
    addCard,
    updateCard,
    deleteCard
}