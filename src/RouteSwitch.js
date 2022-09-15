import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import SignUpSuccess from "./components/SignUp/SignUpSuccess";



export default function RouteSwitch() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return(
        <BrowserRouter>
            <Header user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:postid" element={<Blog user={user}/>}/>
                    <Route path="/login" element={<LogIn user={user} setUser={setUser}/>}/>
                    <Route path="/signup" element={<SignUp/>}/> 
                    <Route path="/signup/success" element={<SignUpSuccess/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    )
}