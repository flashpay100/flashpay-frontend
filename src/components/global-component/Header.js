import React from 'react'
import Logo from '../../images/Logo.png'
import '../../styles/Header.css'
import { signOut } from '../../services/UserService'

const Header = ({ name }) => {
    var firstName = name
    if (name.split(" ").length > 1) {
        firstName = name.substr(0, name.indexOf(' '))
    }

    function handleSignout(e) {
        e.preventDefault()
        signOut()
    }

    return (
        <div className="bg-dark" style={{ fontFamily: "serif" }}>
            <div className="container my-4">            
                <div className="row">
                    <div className="col-md-6 text-center text-md-start">
                        <a href="/home"><img className="d-inline-block header-logo" src={Logo} alt="Logo" /></a>
                        <h3 className="text-danger d-inline-block mx-4 mt-md-0 mt-2" style={{cursor: "pointer"}}><b>Hello, {firstName}</b></h3>
                    </div>
                    <div className="col-md-6 my-md-auto text-center text-md-end mt-2">
                        <a href="/profile" className="link-danger mx-md-4 mx-4" style={{ fontSize: "20px", textUnderlineOffset: "7px" }}>My Profile</a>
                        <button className="btn btn-outline-danger px-md-5 px-3 py-md-2 d-inline-block mx-md-auto mx-4" onClick={(e) => handleSignout(e)} style={{ fontSize: "18px", textUnderlineOffset: "7px" }}><b>Sign Out</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Header.defaultProps = {
    name: "User "
}

export default Header