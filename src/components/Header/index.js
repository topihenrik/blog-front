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
                <a href="/"><h1>{"<Blog/>"}</h1></a>
            </div>
            {user?
            <div className="auth-box">
                <p className="user-name">{user.full_name}</p>
                <a onClick={handleClick}><button className="logout-button">Log Out</button></a>
            </div>:
            <div className="auth-box">
                <a href="/login"><button className="login-button">Login</button></a>
                <a href="/signup"><button className="sign-up-button">Sign up</button></a>
            </div>}
            
        </header>
    )
}