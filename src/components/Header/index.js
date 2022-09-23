import React, { useState } from "react";
import MenuIcon from "../../icons/menu.png";


export default function Header(props) {
    const { user, setUser } = props;
    const [ menuVis, setMenuVis ] = useState("dispNone");

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        setUser(null);
    }

    const handleClickMenu = (e) => {
        e.preventDefault();
        if (menuVis === "dispNone") {
            setMenuVis("dispFlex");
        } else {
            setMenuVis("dispNone");
        }
    }

    return(
        <header>
            <div className="header-box">
                <div className="header-top-box">
                    <div className="logo-box">
                        <a href="/"><h1>{"<Blog/>"}</h1></a>
                    </div>
                    <button onClick={handleClickMenu} id="menuBtn"><img id="menu" src={MenuIcon}/></button>
                </div>
                {user?
                <div className={menuVis + " mobile-auth-box"}>
                    <div className="mobile-user-name-container"><p className="user-name">{user.full_name}</p></div>
                    <a onClick={handleClick}><button className="mobile-logout-button">Log Out</button></a>
                </div>:
                <div className={menuVis + " mobile-auth-box"}>
                    <a href="/login"><button className="mobile-login-button">Login</button></a>
                    <a href="/signup"><button className="mobile-sign-up-button">Sign up</button></a>
                </div>}
                {user?
                <div className="auth-box">
                    <a href="/profile"><div className="user-name-container"><p className="user-name">{user.full_name}</p></div></a>
                    <a onClick={handleClick}><button className="logout-button">Log Out</button></a>
                </div>:
                <div className="auth-box">
                    <a href="/login"><button className="login-button">Login</button></a>
                    <a href="/signup"><button className="sign-up-button">Sign up</button></a>
                </div>}
            </div>
        </header>
    )
}