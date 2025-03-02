import { useState } from 'react';
import MenuIcon from '../../icons/menu.png';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function Header() {
    const [menuVis, setMenuVis] = useState('dispNone');
    const navigate = useNavigate();
    const userContext = useUserContext();

    const handleClick = () => {
        localStorage.clear();
        userContext.clear();
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
                {userContext.token ? (
                    <div className={menuVis + ' mobile-auth-box'}>
                        <a>
                            <button onClick={() => navigate('/profile')} className="mobile-profile-button">
                                <span>Profile</span>
                                <img className="mobile-profile-avatar-icon" src={userContext.avatar_url} />
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
                {userContext.token ? (
                    <div className="auth-box">
                        <a>
                            <button onClick={() => navigate('/profile')} className="profile-button">
                                <img className="profile-avatar-icon" src={userContext.avatar_url} />
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
