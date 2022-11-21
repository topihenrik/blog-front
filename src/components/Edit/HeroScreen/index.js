import React from "react";


export default function HeroScreen(props) {

    return(
        <div className="hero-screen" style={
            {
                backgroundImage: `url("https://res.cloudinary.com/dqcnxy51g/image/upload/v1668989572/${process.env.REACT_APP_CLOUDINARY_FOLDER}/static/blog-bg2_uhn0x6.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            <div className="hero-box">
                <h1>Editor is your playground</h1>
                <p>Create new posts or update your older ones. Whatever you do, the editor is here to assist you.</p>
            </div>
        </div>
    )
}