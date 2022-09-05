import React from "react";


export default function Header(props) {
    const { user, setUser } = props;

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        setUser(null);
    }

    return(
        <header>
            <div className="logo-box">
                <a href="/"><h1>Site Name</h1></a>
            </div>
            {user?
            <div className="auth-box">
                <p>{user.full_name}</p>
                <a onClick={handleClick}><p>Log Out</p></a>
            </div>:
            <div className="auth-box">
                <a href="/signup"><p>Sign up</p></a>
                <a href="/login"><p>Login</p></a>
            </div>}
            
        </header>
    )
}