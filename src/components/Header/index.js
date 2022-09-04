import React from "react";


export default function Header(props) {
    return(
        <header>
            <div>
                <h1>Site Name</h1>
            </div>
            <div className="auth-box">
                <p>Sign up</p>
                <p>Login</p>
            </div>
        </header>
    )
}