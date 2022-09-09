import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SignUpMain(props) {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("first_name", e.target.first_name.value);
        formData.append("last_name", e.target.last_name.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("password_confirm", e.target.password.value);
        formData.append("avatar", file);

        fetch("http://localhost:3000/signup",
            {
                method: "POST",
                body: formData
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
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
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="name-box">
                        <input className="text-input" name="first_name" type="text" placeholder="First Name" required={true}/>
                        <input className="text-input" name="last_name" type="text" placeholder="Last Name" required={true}/>
                    </div>
                    <input className="text-input" name="email" type="email" placeholder="Email" required={true}/>
                    <input className="text-input" name="password" type="password" placeholder="Password" required={true}/>
                    <input className="text-input" name="password_confirm" type="password" placeholder="Confirm Password" required={true}/>
                    <input name="avatar" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
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