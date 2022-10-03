import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import LoadingIcon from "../../../icons/loading.svg"

export default function ProfileDelete(props) {
    const { user, setUser } = props;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState(null);
    const [resultDelete, setResultDelete] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/user/delete/all`,
            {
                headers: {
                    "Authorization": bearer
                },
                method: "DELETE",
                body: new URLSearchParams({email: e.target.email.value, password: e.target.password.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setResultDelete(result);
                if (result.status === 200) {
                    localStorage.clear();
                    setUser(null);
                    navigate("../login", {replace: true});
                }
            }, (error) => {
                console.log(error);
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
            <main className="profile-delete-main">
                <div className="profile-delete-container">
                    <div className="profile-delete-title-box">
                        <h2>Delete Account</h2>
                    </div>
                    <div className="profile-delete-content-box">
                        <div className="profile-delete-information">
                            <p>{result.user.first_name + " " + result.user.last_name + ", you have made " + result.postCount + " posts and " + result.commentCount + " comments and when you delete this account they will be deleted aswell."}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="profile-delete-form">
                            <h3>Account deletion is an irreversible action.</h3>
                            <p>Write your creditentials address to confirm the deletion:</p>
                            <div className="profile-delete-form-div">
                                <input name="email" type="text" placeholder="Email" id="confirmation" className="profile-delete-input"/>
                                <input name="password" type="password" placeholder="Password" className="profile-delete-input"/>
                            </div>
                            {(resultDelete.status >= 400 && resultDelete.status <= 451)  &&
                            <div className="error-box">
                                <p>{resultDelete.message}</p>
                            </div>}
                            {resultDelete["errors"] !== undefined &&
                            resultDelete.errors.map((error) => {
                                return (
                                    <div className="error-box">
                                        <p>{error.msg}</p>
                                    </div>
                                )
                            })
                            }
                            <button className="profile-delete-button">Delete</button>
                        </form>
                    </div>
                </div>
            </main>
        )
    }


}