import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginMain(props) {
    const { user, setUser } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});

    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/login", 
            {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
                body: new URLSearchParams({email: e.target.email.value, password: e.target.password.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                console.log(result);
                if (result.status == 201) {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user", JSON.stringify(result.user));
                    setUser({...result.user});
                    navigate("/", {replace: true});
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    return(
        <div className="loginMain">
            <div className="login-box">
                <div className="title-box">
                    <h2>Log In</h2>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="text-input" id="email" name="email" required={true} type="email" placeholder="Email"/>
                    <input className="text-input" id="password" name="password" required={true} type="password" placeholder="Password"/>
                    {result.status == 401 && 
                    <div className="error-box">
                        <p>{result.message}</p>
                    </div>}
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

