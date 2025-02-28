import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './components/General/Header.jsx';
import { Home } from './components/Home/Home.jsx';
import { Post } from './components/Post/Post.jsx';
import { Footer } from './components/General/Footer.jsx';
import { LogIn } from './components/Authentication/LogIn.jsx';
import { SignUp } from './components/Authentication/SignUp.jsx';
import { Profile } from './components/Profile/Profile.jsx';
import { ProfileEdit } from './components/Profile/ProfileEdit.jsx';
import { ProfileDelete } from './components/Profile/ProfileDelete.jsx';
import { YourStories } from './components/Editor/YourStories.jsx';
import { CreatePost } from './components/Editor/CreatePost.jsx';
import { UpdatePost } from './components/Editor/UpdatePost.jsx';
import { DeletePost } from './components/Editor/DeletePost.jsx';

export function Main() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <BrowserRouter>
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/post/:postid" element={<Post user={user} />} />
                <Route path="/login" element={<LogIn user={user} setUser={setUser} />} />
                <Route path="/signup" element={<SignUp user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/profile/edit" element={<ProfileEdit user={user} setUser={setUser} />} />
                <Route path="/profile/delete" element={<ProfileDelete user={user} setUser={setUser} />} />
                <Route path="/edit" element={<YourStories user={user} />} />
                <Route path="/post/create" element={<CreatePost user={user} />} />
                <Route path="/post/update/:postid" element={<UpdatePost user={user} />} />
                <Route path="/post/delete/:postid" element={<DeletePost user={user} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
