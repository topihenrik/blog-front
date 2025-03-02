import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './components/General/Header.tsx';
import { Home } from './components/Home/Home.tsx';
import { Post } from './components/Post/Post.tsx';
import { Footer } from './components/General/Footer.tsx';
import { LogIn } from './components/Authentication/LogIn.tsx';
import { SignUp } from './components/Authentication/SignUp.tsx';
import { Profile } from './components/Profile/Profile.tsx';
import { ProfileEdit } from './components/Profile/ProfileEdit.tsx';
import { ProfileDelete } from './components/Profile/ProfileDelete.tsx';
import { YourStories } from './components/Editor/YourStories.tsx';
import { CreatePost } from './components/Editor/CreatePost.tsx';
import { UpdatePost } from './components/Editor/UpdatePost.tsx';
import { DeletePost } from './components/Editor/DeletePost.tsx';
import { queryClient } from './config/queryclient.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './contexts/UserContextProvider.tsx';

export function Main() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:postid" element={<Post />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/edit" element={<ProfileEdit />} />
                        <Route path="/profile/delete" element={<ProfileDelete />} />
                        <Route path="/edit" element={<YourStories />} />
                        <Route path="/post/create" element={<CreatePost />} />
                        <Route path="/post/update/:postid" element={<UpdatePost />} />
                        <Route path="/post/delete/:postid" element={<DeletePost />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </UserContextProvider>
        </QueryClientProvider>
    );
}
