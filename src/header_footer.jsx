import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Chat } from './chat/chat';
import { Timeline } from './timeline/timeline';
import { Profile } from './profile/profile';
import { Outlet, Link} from "react-router-dom"

export function Layout() { 
  return (
        <div className='body-layout'>
            <header>
                <nav className="navbar navbar-expand fixed-top bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Us</a>
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to='Chat'>Chat</NavLink>
                            <NavLink className="nav-link" to='Timeline'>Timeline</NavLink>
                            <NavLink className="nav-link" to='Profile'>Profile</NavLink>
                        </div>
                    </div>
                </nav>
            </header>
                <Outlet />
            <footer className="bg-light fixed-bottom">
                <div> 
                    <p><span id = 'name'>Morgan Miles | </span><a href="https://github.com/mgmiles7/startup">GitHub</a> </p>
                </div>
            </footer>
        </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}