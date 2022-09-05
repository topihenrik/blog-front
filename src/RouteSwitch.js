import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeMain from "./components/HomeMain";
import BlogMain from "./components/BlogMain";
import Footer from "./components/Footer";
import LogInMain from "./components/LogInMain";
import SignUpMain from "./components/SignUpMain";
import SignUpSuccess from "./components/SignUpMain/SignUpSuccess";



export default function RouteSwitch() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return(
        <BrowserRouter>
            <Header user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<HomeMain/>}/>
                    <Route path="/posts/:postid" element={<BlogMain user={user}/>}/>
                    <Route path="/login" element={<LogInMain user={user} setUser={setUser}/>}/>
                    <Route path="/signup" element={<SignUpMain/>}/> 
                    <Route path="/signup/success" element={<SignUpSuccess/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    )
}