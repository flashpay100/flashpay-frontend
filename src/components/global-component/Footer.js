import React from 'react'

const Footer = ({ name }) => {
    var displayType = "none"
    if(name === "Leo Varghese" || name === "Subhasish Mohapatra") {
        displayType = "block"
    }
    return (
        <div className="bg-dark" style={{ fontSize: "14px", fontFamily: "serif" }}>
            <p className="text-light mt-3 mb-0 text-center">Copyright &copy; Anush Raghavender {new Date().getFullYear()}</p>
            <p className="text-light mt-3 mb-0 text-center" style={{ display: displayType }}>&#10084; MIG Rocks &#10084;</p>
        </div>
    )
}

Footer.defaultProps = {
    name : " "
}

export default Footer