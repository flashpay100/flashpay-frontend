import React from 'react'

const Error = () => {
    return (
        <div className="bg-dark container-fluid mt-5 text-white" style={{ fontFamily: "serif" }}>
            <h1 className="text-center" style={{ fontSize: "100px", marginBottom: "85px" }}><b>Error 404</b></h1>
            <h5 className="text-center mt-5"><b>Sorry! The Page You Are Looking For Cannot Be Found.</b></h5>
            <a href="/home" className="link-light text-center d-block mx-auto" style={{ fontSize: "23px", marginTop: "100px" }}>Home</a>
        </div>
    )
}

export default Error
