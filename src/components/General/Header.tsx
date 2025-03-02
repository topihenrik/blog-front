import { useState } from 'react';
import MenuIcon from '../../icons/menu.png';
import { useNavigate } from 'react-router';
import { useUserLocalStorage } from '../../hooks/useUserLocalStorage.ts';

export function Header() {
    const [menuVis, setMenuVis] = useState('dispNone');
    const navigate = useNavigate();
    const [user, , clearUser] = useUserLocalStorage();

    const handleClick = () => {
        localStorage.clear();
        clearUser();
        navigate('/', { replace: true });
    };

    const handleClickMenu = () => {
        if (menuVis === 'dispNone') {
            setMenuVis('dispFlex');
        } else {
            setMenuVis('dispNone');
        }
    };

    return (
        <header>
            <div className="header-box">
                <div className="header-top-box">
                    <div className="logo-box">
                        <button className="logo-button" onClick={() => navigate('/')}>
                            <h1>{'<Blog/>'}</h1>
                        </button>
                    </div>
                    <button onClick={handleClickMenu} id="menuBtn">
                        <img id="menu" src={MenuIcon} />
                    </button>
                </div>
                {user ? (
                    <div className={menuVis + ' mobile-auth-box'}>
                        <a>
                            <button onClick={() => navigate('/profile')} className="mobile-profile-button">
                                <span>Profile</span>
                                <img className="mobile-profile-avatar-icon" src={user.avatar_url} />
                            </button>
                        </a>
                        <a onClick={handleClick}>
                            <button className="mobile-logout-button">Log Out</button>
                        </a>
                    </div>
                ) : (
                    <div className={menuVis + ' mobile-auth-box'}>
                        <a>
                            <button onClick={() => navigate('/login')} className="mobile-login-button">
                                Log In
                            </button>
                        </a>
                        <a>
                            <button onClick={() => navigate('/signup')} className="mobile-sign-up-button">
                                Sign Up
                            </button>
                        </a>
                    </div>
                )}
                {user ? (
                    <div className="auth-box">
                        <a>
                            <button onClick={() => navigate('/profile')} className="profile-button">
                                <img className="profile-avatar-icon" src={user.avatar_url} />
                                <span>Profile</span>
                            </button>
                        </a>
                        <a onClick={handleClick}>
                            <button className="logout-button">Log Out</button>
                        </a>
                    </div>
                ) : (
                    <div className="auth-box">
                        <a>
                            <button onClick={() => navigate('/login')} className="login-button">
                                Log In
                            </button>
                        </a>
                        <a>
                            <button onClick={() => navigate('/signup')} className="sign-up-button">
                                Sign Up
                            </button>
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}
