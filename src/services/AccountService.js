import Axios from 'axios'

const URL = "https://flashpay-backend.herokuapp.com"

export default function accountService() {
    return "Account Service"
}

/***************************************** Get Accounts *****************************************/
async function getAccounts() {
    var jwt = document.cookie.substr(9, document.cookie.length)
    var accounts = await Axios.get(URL + "/accounts", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status !== 401) {
                alert("Unauthorized User")
                window.location.replace("/")
            }
            else {
                alert(error.response.data)
            }
        })
    return accounts
}

export {
    getAccounts
}