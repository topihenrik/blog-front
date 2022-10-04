import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import EditIcon from "../../icons/edit.png"
import DeleteIcon from "../../icons/delete.png"
import LoadingIcon from "../../icons/loading.svg"
import { DateTime } from "luxon";

export default function Profile(props) {
    const { user } = props;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/user`, 
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])





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
    } else if (result?.user === undefined) {
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
            <main className="profile-main">
                <div className="profile-container">
                    <div className="profile-title-box">
                        <h2>{"Hello, " + result?.user.first_name + " " + result?.user.last_name + "! 👋"}</h2>
                    </div>
                    <div className="profile-content-box">
                        <p>{"Since the creation of your account " + Math.floor(-1*DateTime.fromJSDate(new Date(result.user.creation_date)).diffNow("days").values.days) + " days ago, you have created " + result.postCount + " posts and " + result.commentCount + " comments."}</p>
                        <div className="profile-personal-information">
                            <h2>Personal Information</h2>
                            <div className="profile-personal-box">
                                <div className="profile-personal-text">
                                    <p>{"First Name: " + result?.user.first_name}</p>
                                    <p>{"Last Name: " + result?.user.last_name}</p>
                                    <p>{"Email: " + result?.user.email}</p>
                                    <p>{"Date of Birth: " + DateTime.fromJSDate(new Date(result?.user.dob)).toLocaleString()}</p>
                                </div>
                                <div>
                                    
                                        <img id="author-avatar-profile" src={`${process.env.REACT_APP_API_URL}/`+result?.user?.avatar?.path}/>
                                    </div>
                            </div>
                        </div>
                        <div className="profile-action-buttons">
                            <a href="/profile/edit"><button className="profile-action-button"><img className="icon" src={EditIcon}/>Edit Information</button></a>
                            <a href="/profile/delete"><button className="profile-action-button"><img className="icon" src={DeleteIcon}/>Delete Account</button></a>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}