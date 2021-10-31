import React, { useState } from 'react'
import Footer from '../global-component/Footer'
import Icon from '../../images/Icon.png'
import Logo from '../../images/Logo.png'
import '../../styles/Signin.css'
import { signIn } from '../../services/UserService'

const Signin = () => {
    const [data, setData] = useState({
        phoneNumber : '',
        password : ''
    })

    function handleChange(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        signIn(data.phoneNumber, data.password)
    }

    return (
        <div className="bg-dark container-fluid">
            <img className="py-3 d-block mx-auto logo" src={Logo} alt="Logo" />
            <div className="row mt-4 mt-md-3 text-center pb-md-4 pb-lg-0" style={{ fontFamily: "serif" }}>
                <div className="col-md-6 d-none d-md-block">
                    <h3 className="text-danger"><b>Welcome To FlashPay</b></h3>
                    <img className="mt-3 mb-4 icon" alt="Icon" src={Icon} />
                    <h5 className="text-warning mt-1"><b>Payments Made Easy</b></h5>
                </div>
                <div className="col-md-6">
                    <h3 className="text-danger"><b>Sign In</b></h3>
                    <form className="mt-5 py-0 pt-md-2 mb-5 mb-md-0" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                        <input placeholder="Phone Number" onChange={(e) => handleChange(e)} id="phoneNumber" value={data.phoneNumber} type="number" className="input-fields" required />
                        <input placeholder="Password" onChange={(e) => handleChange(e)} id="password" value={data.password} type="password" className="input-fields mt-5 mb-2" required />
                        <button type="submit" className="btn btn-outline-warning rounded-3 border-2 py-2 px-5 mt-5" style={{ fontSize: "18px" }}><b>Sign In</b></button>
                        <p className="text-light mt-5">Dont Have An Account Yet ? <a href="/signup" className="link-light" style={{ textUnderlineOffset: "7px" }}>Sign Up</a></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signin