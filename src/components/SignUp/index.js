import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";


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
        formData.append("password_confirm", e.target.password_confirm.value);
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
        <main className="signUpMain">
            <div className="signup-box">
                <div className="signup-title-box">
                    <h2>Sign Up</h2>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-name-box">
                        <input className="text-input" name="first_name" type="text" placeholder="First Name" required={true}/>
                        <input className="text-input" name="last_name" type="text" placeholder="Last Name" required={true}/>
                    </div>
                    <input className="text-input" name="email" type="email" placeholder="Email" required={true}/>
                    <input className="text-input" name="password" type="password" placeholder="Password" required={true}/>
                    <input className="text-input" name="password_confirm" type="password" placeholder="Confirm Password" required={true}/>
                    {/* <input className="file-input" name="avatar" type="file" accept="image/png, image/jpeg" onChange={handleChange}/> */}
                    <div className="signup-avatar-box">
                        <label className="signup-avatar-label" htmlFor="avatar"><img id="upload-icon" src={uploadIcon}/><span className="signup-avatar-span">{file?file.name:"Avatar image"}</span></label>
                        <input id="avatar" name="avatar" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                    </div>
                    {(result.status >= 400 && result.status <= 451)  &&
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
        </main>
    )
}