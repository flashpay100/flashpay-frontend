import React, { useState } from 'react'
import Footer from '../global-component/Footer'
import Icon from '../../images/Icon.png'
import Logo from '../../images/Logo.png'
import '../../styles/Signup.css'
import { signUp } from '../../services/UserService'

const Signup = () => {
    const [data, setData] = useState({
        phoneNumber : '',
        userName : '',
        emailAddress: '',
        accountType : '',
        password : ''
    })

    function handleChange(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        signUp(data.phoneNumber, data.userName, data.emailAddress, data.accountType, data.password)
    }

    return (
        <div className="bg-dark container-fluid signup-page">
            <img className="py-3 d-block mx-auto logo" alt="Logo" src={Logo} />
            <div className="row mt-4 mt-md-3 text-center pb-md-4 pb-lg-0" style={{ fontFamily : "serif" }}>
                <div className="col-md-6 d-none d-md-block">
                    <h3 className="text-danger"><b>Welcome To FlashPay</b></h3>
                    <img className="mt-3 mb-4 icon" alt="Icon" src={Icon} />
                    <h5 className="text-warning mt-1"><b>Payments Made Easy</b></h5>
                </div>
                <div className="col-md-6">
                    <h3 className="text-danger"><b>Sign Up</b></h3>
                    <form className="mt-4 pt-2 mb-2 mb-md-0" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                        <input placeholder="Phone Number" onChange={(e) => handleChange(e)} id="phoneNumber" type="number" className="input-fields" required />
                        <input placeholder="Email Address" onChange={(e) => handleChange(e)} id="emailAddress" type="email" className="input-fields mt-4" required />
                        <input placeholder="User Name" onChange={(e) => handleChange(e)} id="userName" type="text" className="input-fields mt-4" required maxLength="30" />
                        <input placeholder="Password" onChange={(e) => handleChange(e)} id="password" type="password" className="input-fields mt-4" required />
                        <select onChange={(e) => handleChange(e)} defaultValue={"Default"} id="accountType" type="text" className="select-fields mt-4 mb-2 pt-2" required>
                            <option value="Default" disabled>Account Type</option>
                            <option value="Personal">Personal Account</option>
                            <option value="Business">Business Account</option>
                            <option value="Utility">Utility Account</option>
                            <option value="Service">Service Account</option>
                            <option value="Investment">Investment Account</option>
                            <option value="Charity">Charity Account</option>
                            <option value="Admin">Admin Account</option>
                        </select>
                        <button type="submit" className="btn btn-outline-warning rounded-3 border-2 py-2 px-5 mt-4" style={{ fontSize: "18px" }}><b>Sign Up</b></button>
                        <p className="text-light mt-4">Already Have An Account ? <a href="/" className="link-light" style={{ textUnderlineOffset: "7px" }}>Sign In</a></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup