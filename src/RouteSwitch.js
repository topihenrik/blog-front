import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                    <Route path="/posts/:postid" element={<BlogMain/>}/>
                    <Route/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    )
}