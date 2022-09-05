import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SignUpMain(props) {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/signup",
            {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams(
                    {
                        first_name: e.target.first_name.value, 
                        last_name: e.target.last_name.value,
                        email: e.target.email.value,
                        password: e.target.password.value,
                        password_confirm: e.target.password_confirm.value
                    })
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                console.log(result.errors)
                if (result.status === 201) {
                    navigate("/signup/success", {replace: true});
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    return(
        <div className="signUpMain">
            <div className="signup-box">
                <div className="title-box">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="name-box">
                        <input name="first_name" type="text" placeholder="First Name" required={true}/>
                        <input name="last_name" type="text" placeholder="Last Name" required={true}/>
                    </div>
                    <input name="email" type="email" placeholder="Email" required={true}/>
                    <input name="password" type="password" placeholder="Password" required={true}/>
                    <input name="password_confirm" type="password" placeholder="Confirm Password" required={true}/>
                    {result.status === 409  &&
                    <div className="error-box">
                        <p>{result.message}</p>
                    </div>}
                    {result["errors"] !== undefined &&
                    result.errors.map((error) => {
                        return (
                            <div className="error-box">
                                <p>{error.msg}</p>
                            </div>
                        )
                    })
                    }
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}