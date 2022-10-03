import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import {DateTime} from "luxon";

export default function SignUp(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [file, setFile] = useState(null);
    const [years, setYears] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loopYears = [];
        for (let i = new Date().getFullYear();i>=1900;i--) {
            loopYears.push(i)
        }
        setYears(loopYears);
    },[])

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Client side validation
        const dob_iso = e.target.dob_year.value.padStart(2, "0") + "-" + e.target.dob_month.value.padStart(2, "0") + "-" + e.target.dob_day.value.padStart(2, "0");
        if (!DateTime.fromISO(dob_iso).isValid) {
            setResult({errors:[{msg: "Invalid date"}]})
            return;
        }

        if(DateTime.fromISO(dob_iso).diffNow("years").years>-18) {
            setResult({errors:[{msg: "you must be over 18 years old"}]})
            return;
        }

        const formData = new FormData();
        formData.append("first_name", e.target.first_name.value);
        formData.append("last_name", e.target.last_name.value);
        formData.append("email", e.target.email.value);
        formData.append("dob", dob_iso);
        formData.append("password", e.target.password.value);
        formData.append("password_confirm", e.target.password_confirm.value);
        formData.append("avatar", file);

        fetch(`${process.env.REACT_APP_API_URL}/signup`,
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
        <main className="signup-main">
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
                    <div className="signup-dob-box">
                        <p>Date of Birth</p>
                        <div className="signup-select-box">
                            <select className="dob-select" name="dob_day">
                                <option className="dob-option" disabled selected>Day</option>
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day) => {
                                    return(
                                        <option className="dob-option" value={day}>{day}</option>
                                    )
                                })}
                            </select>
                            <select className="dob-select" name="dob_month">
                                <option className="dob-option" disabled selected>Month</option>
                                <option className="dob-option" value={1}>January</option>
                                <option className="dob-option" value={2}>February</option>
                                <option className="dob-option" value={3}>March</option>
                                <option className="dob-option" value={4}>April</option>
                                <option className="dob-option" value={5}>May</option>
                                <option className="dob-option" value={6}>June</option>
                                <option className="dob-option" value={7}>July</option>
                                <option className="dob-option" value={8}>August</option>
                                <option className="dob-option" value={9}>September</option>
                                <option className="dob-option" value={10}>October</option>
                                <option className="dob-option" value={11}>November</option>
                                <option className="dob-option" value={12}>December</option>
                            </select>
                            <select className="dob-select" name="dob_year">
                                <option className="dob-option" disabled selected>Year</option>
                                {years.map((year) => {
                                    return(
                                        <option className="dob-option" value={year}>{year}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <input className="text-input" name="password" type="password" placeholder="Password" required={true}/>
                    <input className="text-input" name="password_confirm" type="password" placeholder="Confirm Password" required={true}/>
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