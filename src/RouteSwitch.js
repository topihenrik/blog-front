import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import HomeMain from "./components/HomeMain";
import BlogMain from "./components/BlogMain";
import Footer from "./components/Footer";



export default function RouteSwitch() {
    return(
        <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<HomeMain/>}/>
                    <Route path="/post" element={<BlogMain/>}/>
                    <Route/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    )
}