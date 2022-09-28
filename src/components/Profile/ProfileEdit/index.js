import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../../icons/file_upload.png";
import LoadingIcon from "../../../icons/loading.svg"
import { DateTime } from "luxon";
import { nanoid } from "nanoid";

export default function ProfileEdit(props) {
    const { user, setUser } = props;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState(null);
    const [file, setFile] = useState(null);
    const [years, setYears] = useState([]);
    const [oldDob, setOldDob] = useState(undefined);
    const [resultBasic, setResultBasic] = useState({});
    const [resultPassword, setResultPassword] = useState({});

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const loopYears = [];
        for (let i = new Date().getFullYear();i>=1900;i--) {
            loopYears.push(i)
        }
        setYears(loopYears);

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("http://localhost:3000/auth/user/edit",
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result.user);
                setOldDob({
                    "date": new Date(result.user.dob).getDate(),
                    "month": new Date(result.user.dob).getMonth(),
                    "year": new Date(result.user.dob).getFullYear(),
                })
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])



    const handleSubmitBasic = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");

        // Client side validation
        const dob_iso = e.target.dob_year.value.padStart(2, "0") + "-" + e.target.dob_month.value.padStart(2, "0") + "-" + e.target.dob_day.value.padStart(2, "0");
        console.log(dob_iso);
        if (!DateTime.fromISO(dob_iso).isValid) {
            console.log("Not valid date")
            setResult({errors:[{msg: "Invalid date"}]})
            return;
        }

        if(DateTime.fromISO(dob_iso).diffNow("years").years>-18) {
            console.log("You must be over 18 years old to make an account.")
            setResult({errors:[{msg: "you must be over 18 years old"}]})
            return;
        }

        const formData = new FormData();
        formData.append("first_name", e.target.first_name.value);
        formData.append("last_name", e.target.last_name.value);
        formData.append("email", e.target.email.value);
        formData.append("dob", dob_iso);
        formData.append("avatar", file);
        console.log(formData);
        fetch("http://localhost:3000/auth/user/basic",
            {
                headers: {
                    "Authorization": bearer
                },
                method: "PUT",
                body: formData
            })
            .then((res) => res.json())
            .then((result) => {
                // Do something with result
                setResultBasic(result);
                if (result.status === 201) {
                    navigate("../profile", {replace: true});
                }
            }, (error) => {
                // Do something with fetch error
            })
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");

        fetch("http://localhost:3000/auth/user/password",
            {
                headers: {
                    "Authorization": bearer
                },
                method: "PUT",
                body: new URLSearchParams({"old_password": e.target.old_password.value, "password": e.target.password.value, "password_confirm": e.target.password_confirm.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setResultPassword(result);
                if (result.status === 201) {
                    localStorage.clear();
                    setUser(null);
                    navigate("../login", {replace: true});
                }
            }, (error) => {
                // Do something with fetch error
            })
    }

    if (error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    } else if (result === undefined) {
        return (
            <div className="no-content-main">
                <div className="no-content-container">
                    <h2>No profile found</h2>
                    <p>Something went wrong.</p>
                </div>
            </div>
        )
    } else {
        return(
            <main className="profile-edit-main">
                <div className="profile-edit-container">
                    <div className="profile-edit-title-box">
                        <h2>Edit Information</h2>
                    </div>
                    <div className="profile-forms">
                        <form onSubmit={handleSubmitBasic} className="profile-form">
                            <h2>Basic Information</h2>
                            <input className="text-input" name="first_name" placeholder="First Name" defaultValue={result.first_name}/>
                            <input className="text-input" name="last_name" placeholder="Last Name" defaultValue={result.last_name}/>
                            <input className="text-input" name="email" placeholder="Email" defaultValue={result.email}/>
                            <div className="signup-dob-box">
                                <p>Date of Birth</p>
                                <div className="signup-select-box">
                                    <select className="dob-select" name="dob_day">
                                        <option className="dob-option" disabled selected>Day</option>
                                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day, i) => {
                                            if (oldDob.date == i+1) {
                                                return(
                                                    <option key={nanoid(10)} selected className="dob-option" value={day}>{day}</option>
                                                )
                                            } else {
                                                return(
                                                    <option key={nanoid(10)} className="dob-option" value={day}>{day}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <select className="dob-select" name="dob_month">
                                        <option className="dob-option" disabled selected>Month</option>
                                        {["January","February","March","April","May","June","July","August","September","October","November","December"].map((month, i) => {
                                            if (oldDob.month == i) {
                                                return(
                                                    <option key={nanoid(10)} selected className="dob-option" value={i+1}>{month}</option>
                                                )
                                            } else {
                                                return(
                                                    <option key={nanoid(10)} className="dob-option" value={i+1}>{month}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <select className="dob-select" name="dob_year">
                                        <option className="dob-option" disabled selected>Year</option>
                                        {years.map((year, i) => {
                                            if (oldDob.year == year) {
                                                return(
                                                    <option key={nanoid(10)} selected className="dob-option" value={year}>{year}</option>
                                                )
                                            } else {
                                                return(
                                                    <option key={nanoid(10)} className="dob-option" value={year}>{year}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="profile-avatar-box">
                                <label className="profile-avatar-label" htmlFor="avatar"><img id="upload-icon" src={uploadIcon}/><span className="profile-avatar-span">{file?file.name:result.avatar.originalName?result.avatar.originalName:"Avatar image"}</span></label>
                                <input id="avatar" name="avatar" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                            </div>
                            {(resultBasic.status >= 400 && resultBasic.status <= 451)  &&
                            <div className="error-box">
                                <p>{resultBasic.message}</p>
                            </div>}
                            {resultBasic["errors"] !== undefined &&
                            resultBasic.errors.map((error) => {
                                return (
                                    <div className="error-box">
                                        <p>{error.msg}</p>
                                    </div>
                                )
                            })
                            }
                            <button className="profile-edit-button">Update</button>
                        </form>
                        <form onSubmit={handleSubmitPassword} className="profile-form">
                            <h2>Change Password</h2>
                            <input className="text-input" type="password" name="old_password" placeholder="Old Password"/>
                            <input className="text-input" type="password" name="password" placeholder="New Password"/>
                            <input className="text-input" type="password" name="password_confirm" placeholder="Confirm New Password"/>
                            {(resultPassword.status >= 400 && resultPassword.status <= 451)  &&
                            <div className="error-box">
                                <p>{resultPassword.message}</p>
                            </div>}
                            {resultPassword["errors"] !== undefined &&
                            resultPassword.errors.map((error) => {
                                return (
                                    <div className="error-box">
                                        <p>{error.msg}</p>
                                    </div>
                                )
                            })
                            }
                            <button className="profile-edit-button">Update</button>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}