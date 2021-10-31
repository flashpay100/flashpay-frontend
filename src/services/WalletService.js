import Axios from 'axios'

const URL = "https://flashpay-backend.herokuapp.com"

export default function walletService() {
    return "Wallet Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Add Amount *****************************************/
async function addAmount(submittedcardNumber, submittedAmount) {
    var jwt = getJWTToken()
    await Axios.put(URL + "/wallet/depositamount", null, {
        params: { cardNumber: submittedcardNumber, amount: submittedAmount, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("₹" + submittedAmount + " Added To Wallet")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Bank Transfer *****************************************/
async function bankTransfer(submittedcardNumber, submittedAmount) {
    var jwt = getJWTToken()
    await Axios.put(URL + "/wallet/banktransfer", null, {
        params: { cardNumber: submittedcardNumber, amount: submittedAmount, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("₹" + submittedAmount + " Transferred To Bank")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Payment *****************************************/
async function payment(submittedPhoneNumber, submittedAmount, paymentType, paymentAccountName) {
    var jwt = getJWTToken()
    await Axios.put(URL + "/wallet/payment", null, {
        params: { phoneNumber: submittedPhoneNumber, amount: submittedAmount, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                if(paymentType === "Investment") {
                    paymentType = "Invested On"
                }
                else if(paymentType === "Charity") {
                    paymentType = "Donated To"
                }
                else {
                    paymentType = "Paid To"
                }
                alert("₹" + submittedAmount + " " + paymentType + " " + paymentAccountName)
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Sell Investment *****************************************/
async function sellInvestment(submittedInvestmentAccountName, submittedAmount) {
    var jwt = getJWTToken()
    await Axios.put(URL + "/wallet/sellinvestment", null, {
        params: { investmentAccountName : submittedInvestmentAccountName, amount: submittedAmount, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("₹" + submittedAmount + " Investment Sold")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

export {
    addAmount,
    bankTransfer,
    payment,
    sellInvestment
}