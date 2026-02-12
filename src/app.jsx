import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from './header_footer'
import { Login } from './login/login'
import { Chat } from './chat/chat';
import { Timeline } from './timeline/timeline';
import { Profile } from './profile/profile';

export default function App() {

    return ( 
        <Routes>
            <Route path = '/' element = {<Login />} exact />
            <Route path = '/header_footer' element = {<Layout />}>
                <Route path='Chat' element={<Chat />} exact />
                <Route path = 'Timeline' element={<Timeline />} />
                <Route path = 'Profile' element={<Profile />} />
                <Route path='*' element={<NotFound />} />
            </Route> 
        </Routes>
    );
   
}
function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
        }