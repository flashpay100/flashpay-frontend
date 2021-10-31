import Axios from 'axios'

const URL = "https://flashpay-backend.herokuapp.com"

export default function userService() {
    return "User Service"
}

function getJWTToken() {
    return document.cookie.substr(9, document.cookie.length)
}

/***************************************** Sign In *****************************************/
async function signIn(submittedPhoneNumber, submittedPassword) {
    await Axios.post(URL + "/user/signin", null, {
        params: { phoneNumber: submittedPhoneNumber, password: submittedPassword } 
        })
        .then(response => {
            document.cookie = `jwtToken=${response.data.value}`
            if(response.status === 200) {
                alert("Signed In")
                window.location.replace("/home")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Sign Up *****************************************/
async function signUp(submittedPhoneNumber, submittedUserName, submittedEmailAddress, submittedAccountType, submittedPassword) {
    await Axios.post(URL + "/user/signup", {
        phoneNumber: submittedPhoneNumber,
        userName : submittedUserName,
        emailAddress : submittedEmailAddress,
        accountType : submittedAccountType,
        password: submittedPassword
        })
        .then(response => {
            alert(response.data)
            if(response.status === 201) {
                window.location.replace("/")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Get User Details *****************************************/
async function getUserDetails() {
    var jwt = getJWTToken()
    var user = await Axios.get(URL + "/user", { params: { jwtToken: jwt } })
        .then(response => response.data)
        .catch(error => {
            if(error.response.status !== 401) {
                alert("Unauthorized User")
                window.location.replace("/")
            }
        })
    return user
}

/***************************************** Update Phone *****************************************/
async function updatePhone(submittedPhoneNumber, submittedPassword) {
    var jwt = getJWTToken()
    var updateStatus = false
    await Axios.patch(URL + "/user/phone", null, {
        params: { password: submittedPassword, newPhoneNumber: submittedPhoneNumber, jwtToken: jwt } 
        })
        .then(response => {
            document.cookie = `jwtToken=${response.data.value}`
            if(response.status === 202) {
                alert("Phone Number Updated")
                updateStatus = true
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
    return updateStatus
}

/***************************************** Update Email *****************************************/
async function updateEmail(submittedEmailAddress) {
    var jwt = getJWTToken()
    var updateStatus = false
    await Axios.patch(URL + "/user/email", null, {
        params: { newEmailAddress: submittedEmailAddress, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Email Address Updated")
                updateStatus = true
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
    return updateStatus
}

/***************************************** Update Name *****************************************/
async function updateName(submittedUserName) {
    var jwt = getJWTToken()
    var updateStatus = false
    await Axios.patch(URL + "/user/name", null, {
        params: { newUserName: submittedUserName, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("User Name Updated")
                updateStatus = true
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
    return updateStatus
}

/***************************************** Update Password *****************************************/
async function updatePassword(submittedPassword, submittedNewPassword) {
    var jwt = getJWTToken()
    await Axios.patch(URL + "/user/password", null, {
        params: { password: submittedPassword, newPassword: submittedNewPassword, jwtToken: jwt } 
        })
        .then(response => {
            if(response.status === 202) {
                alert("Password Updated")
                window.location.reload()
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Delete Account *****************************************/
async function deleteAccount(submittedPassword) {
    var jwt = getJWTToken()
    await Axios.delete(URL + "/user", {
        params: { password: submittedPassword, jwtToken: jwt } 
        })
        .then(response => {
            alert(response.data)
            if(response.status === 202) {
                document.cookie = "jwtToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                window.location.replace("/")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

/***************************************** Sign Out *****************************************/
async function signOut() {
    var jwt = getJWTToken()
    await Axios.post(URL + "/user/signout", null, { params: { jwtToken: jwt } })
        .then(response => {
            alert(response.data)
            if(response.status === 202) {
                document.cookie = "jwtToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                window.location.replace("/")
            }
        })
        .catch(error => {
            alert(error.response.data)
        })
}

export {
    signIn,
    signUp,
    getUserDetails,
    updatePhone,
    updateEmail,
    updateName,
    updatePassword,
    deleteAccount,
    signOut
}