import React from "react";

export default function ProfileDelete(props) {

    return(
        <main className="profile-delete-main">
            <div className="profile-delete-container">
                <div className="profile-delete-title-box">
                    <h2>Delete Account</h2>
                </div>
                <div className="profile-delete-content-box">
                    <div className="profile-delete-information">
                        <p>{"<Jeff Peterson>, you have made 0 posts and 0 comments and when you delete this account they will be deleted aswell."}</p>
                    </div>
                    <form className="profile-delete-form">
                        <h3>Account deletion is an irreversible action.</h3>
                        <label htmlFor="confirmation">Write your email address to confirm the deletion:</label>
                        <div className="profile-delete-form-div">
                            <input id="confirmation" name="confirmation" className="profile-delete-input"/>
                            <button className="profile-delete-button">Delete</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </main>
    )
}