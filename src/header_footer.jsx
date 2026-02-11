import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Chat } from './chat/chat';
import { Timeline } from './timeline/timeline';
import { Profile } from './profile/profile';

export function Layout() {
  return (
    <BrowserRouter>
        <div className = "body">
            <header>
                <nav className="navbar navbar-expand fixed-top bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Us</a>
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to='chat'>Chat</NavLink>
                            <NavLink className="nav-link" to='timeline'>Timeline</NavLink>
                            <NavLink className="nav-link" to='profile'>Profile</NavLink>
                        </div>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path='/' element={<Chat />} exact />
                <Route path = '/timeline' element={<Timeline />} />
                <Route path = 'profile' element={<Profile />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <footer className="bg-light fixed-bottom">
                <div> 
                    <p>Morgan Miles | <a href="https://github.com/mgmiles7/startup">GitHub</a> </p>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}