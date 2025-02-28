import React from "react";

export function HeroScreen() {
    return(
        <div className="hero-screen" style={
            {
                backgroundImage: `url("https://res.cloudinary.com/dqcnxy51g/image/upload/v1668987801/${import.meta.env.VITE_CLOUDINARY_FOLDER}/static/blog-bg_tmdcsm.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }>
            <div className="hero-box">
                <h1>Share your ideas.</h1>
                <p>Discover and share different perspectives with other participants from around the world.</p>
            </div>
        </div>
    )
}
