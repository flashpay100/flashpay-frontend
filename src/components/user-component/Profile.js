import React, { useEffect, useState } from 'react'
import Header from '../global-component/Header'
import Footer from '../global-component/Footer'
import { getUserDetails, updatePhone, updateEmail, updateName, updatePassword, deleteAccount } from '../../services/UserService'
import { sellInvestment } from '../../services/WalletService'
import '../../styles/Profile.css'

const Profile = () => {
    const [user, setUser] = useState({
        id : '',
        userName : '',
        emailAddress : '',
        accountType : '',
        accountStatus : '',
        creationDateTime : '',
        investments : {},
        donations : {}
    })

    useEffect(() => {
        getUserDetails().then(user => setUser(user))
    }, [])

    function handleDelete(e) {
        e.preventDefault()
        var password = prompt('Enter Your Password')
        if(password !== "" && password !== null) {
            deleteAccount(password)
        }        
    }

    const [showUpdateButtons, setShowUpdateButtons] = useState(false)
    var updateDisplayType = "none"
    var updateButtonText = "Update Account"
    function handleUpdate(e) {
        e.preventDefault()
        setShowUpdateButtons(!showUpdateButtons)
    }    
    if(showUpdateButtons === true) {
        updateDisplayType = "block"
        updateButtonText = "Back"
    }

    const [showSellButtons, setShowSellButtons] = useState(false)
    var sellDisplayType = "none"
    var sellButtonText = "Sell Investment"
    function handleSell(e) {
        e.preventDefault()
        setShowSellButtons(!showSellButtons)
    }    
    if(showSellButtons === true) {
        sellDisplayType = "block"
        sellButtonText = "Back"
    }

    async function handleUpdatePhone(e) {
        e.preventDefault()
        var password = prompt('Enter Your Password')
        var newPhoneNumber = prompt('Enter Your New Phone Number')
        if(password !== "" && password !== null && newPhoneNumber !== "" && newPhoneNumber !== null) {
            var updateStatus = await updatePhone(newPhoneNumber, password)
            if(updateStatus === true) {
                setUser({ ...user, id: newPhoneNumber })
            }     
        }        
    }

    async function handleUpdateEmail(e) {
        e.preventDefault()
        var newEmailAddress = prompt('Enter Your New Email Address')
        if(newEmailAddress !== "" && newEmailAddress !== null) {
            var updateStatus = await updateEmail(newEmailAddress)
            if(updateStatus === true) {
                setUser({ ...user, emailAddress: newEmailAddress })
            }     
        }   
    }

    async function handleUpdateName(e) {
        e.preventDefault()
        var newUserName = prompt('Enter Your New User Name')
        newUserName = newUserName[0].toUpperCase() + newUserName.slice(1)
        if(newUserName !== "" && newUserName !== null) {
            var updateStatus = await updateName(newUserName)
            if(updateStatus === true) {
                setUser({ ...user, userName: newUserName })
            }  
        }      
    }

    async function handleUpdatePassword(e) {
        e.preventDefault()
        var password = prompt('Enter Your Password')
        var newPassword = prompt('Enter Your New Password')
        if(password !== "" && password !== null && newPassword !== "" && newPassword !== null) {
            updatePassword(password, newPassword)
        }        
    }

    function handleSellInvestment(investmentAccountName) {
        var amount = prompt('Enter The Amount To Be Sold')
        if(amount !== "" && amount !== null) {
           sellInvestment(investmentAccountName, amount)
        }       
    }

    return (
        <div className="bg-dark pb-3" style={{ fontFamily: "serif" }}>
            <Header name={user.userName}/>
            <div className="container mt-4 mb-4">
                <div className="border border-danger border-3 rounded-3 mx-md-5 pb-4 text-white">
                    <h4 className="text-center text-white mt-3 mb-4" style={{ textUnderlineOffset: "7px" }}><u><b>My Profile</b></u></h4>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="profile-fields ms-lg-5 ms-3 mt-lg-2 mt-md-1 mb-md-3 mb-2">Phone Number : {user.id}</p>
                        </div>
                        <div className="col-12 col-md-6" style={{display: updateDisplayType}}>
                            <button className="btn btn-outline-warning ms-3 ms-lg-0 mb-3 mb-md-0" onClick={(e) => handleUpdatePhone(e)}>Update</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="profile-fields ms-lg-5 ms-3 mt-lg-2 mt-md-1 mb-md-3 mb-2">User Name : {user.userName}</p>
                        </div>
                        <div className="col-12 col-md-6" style={{display: updateDisplayType}}>
                            <button className="btn btn-outline-warning ms-3 ms-lg-0 mb-3 mb-md-0" onClick={(e) => handleUpdateName(e)}>Update</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="profile-fields ms-lg-5 ms-3 mt-lg-2 mt-md-1 mb-md-3 mb-2">Email Address : {user.emailAddress}</p>
                        </div>
                        <div className="col-12 col-md-6" style={{display: updateDisplayType}}>
                            <button className="btn btn-outline-warning ms-3 ms-lg-0 mb-3 mb-md-0" onClick={(e) => handleUpdateEmail(e)}>Update</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="profile-fields ms-lg-5 ms-3 mt-lg-2 mt-md-1 mb-md-3 mb-2">Password : ********</p>
                        </div>
                        <div className="col-12 col-md-6" style={{display: updateDisplayType}}>
                            <button className="btn btn-outline-warning ms-3 ms-lg-0 mb-3 mb-md-0" onClick={(e) => handleUpdatePassword(e)}>Update</button>
                        </div>
                    </div>
                    <div className="row">
                        <p className="profile-fields ms-lg-5 ms-3 mt-md-1 mb-md-3 mb-2">Account Type : {user.accountType}</p>
                        <p className="profile-fields ms-lg-5 ms-3 mt-md-1 mb-md-3 mb-2">Account Status : {user.accountStatus}</p>
                        <p className="profile-fields ms-lg-5 ms-3 mt-md-1 mb-md-3 mb-2">Account Creation Date & Time : {user.creationDateTime}</p>
                    </div>                        
                    <div className="col my-md-auto text-center text-md-end mt-3 mt-md-4">
                        <button className="btn btn-outline-warning rounded-3 border-2 px-3 me-lg-4 me-md-3 me-2" onClick={(e) => handleUpdate(e)}><b>{updateButtonText}</b></button>
                        <button className="btn btn-outline-danger rounded-3 border-2 px-3 me-lg-5 me-md-3 ms-md-0 ms-2" onClick={(e) => handleDelete(e)}><b>Delete Account</b></button>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-4">
                <div className="border border-warning border-3 rounded-3 mx-md-5 pb-4 text-warning">
                    <h4 className="text-center text-white mt-3 mb-4" style={{ textUnderlineOffset: "7px" }}><u><b>My Investments</b></u></h4>
                    {Object.keys(user.investments).map((key, i) => (
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <p key={i} className="text-white profile-fields ms-lg-5 ms-3 mt-lg-2 mt-md-1 mb-md-3 mb-2"><b>{key} : {user.investments[key]}</b></p>
                                </div>
                                <div className="col-12 col-md-8" style={{display: sellDisplayType}}>
                                    <button className="btn btn-outline-warning ms-3 ms-lg-0 mb-3 mb-md-0" onClick={(e) => handleSellInvestment(key)}>Sell</button>
                                </div>
                            </div>
                            ))
                    }
                    <div className="col my-md-auto text-center text-md-end mt-3 mt-md-4">
                        <button className="btn btn-outline-warning rounded-3 border-2 px-3 me-lg-4 me-md-3 me-2" onClick={(e) => handleSell(e)}><b>{sellButtonText}</b></button>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-4 text-white">
                <div className="border border-success border-3 rounded-3 mx-md-5 pb-4 text-warning">
                    <h4 className="text-center text-white mt-3 mb-4" style={{ textUnderlineOffset: "7px" }}><u><b>My Donations</b></u></h4>
                    {Object.keys(user.donations).map((key, i) => (
                            <p key={i} className="ms-lg-5 ms-3 profile-fields text-white"><b>{key} : {user.donations[key]}</b></p>
                        ))
                    }
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Profile