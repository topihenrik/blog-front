import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

export default function LogIn(props) {
    const { user, setUser } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null) {
            navigate("/", {replace: true});
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        fetch(`${process.env.REACT_APP_API_URL}/login`, 
            {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
                body: new URLSearchParams({email: e.target.email.value, password: e.target.password.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                if (result.status === 201) {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user", JSON.stringify(result.user));
                    setUser({...result.user});
                    navigate("/", {replace: true});
                }
                setSubmitBtnDisabled(false);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                setSubmitBtnDisabled(false);
            })
    }

    return(
        <main className="login-main">
            <div className="login-box">
                <div className="login-title-box">
                    <h2>Log In</h2>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="text-input" id="email" name="email" required={true} type="email" placeholder="Email"/>
                    <input className="text-input" id="password" name="password" required={true} type="password" placeholder="Password"/>
                    {result.status == 401 && 
                    <div className="error-box">
                        <p>{result.message}</p>
                    </div>}
                    <button disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}>Log In</button>
                </form>
            </div>
        </main>
    )
}
