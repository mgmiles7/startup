import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from './header_footer'
import { Login } from './login/login'
import { Chat } from './chat/chat';
import { Timeline } from './timeline/timeline';
import { Profile } from './profile/profile';
import { AuthState } from './login/authState';
import { User } from './user';

export default function App() {
    // const [userName, setUserName] = React.useState(localStorage.getItem('username') || "");
    // const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    // const [authState, setAuthState] = React.useState(currentAuthState)
    // const [linked, changeLink] = React.useState({state: false, id: userName});

    const [user, setUser] = React.useState(() => {
        const savedUser = localStorage.getItem('user');

        if (!savedUser) return null;

        const parsed = JSON.parse(savedUser);
        return new User(parsed.userName, parsed.linked, parsed.with);
    })
    const currentAuthState = user ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [linked, changeLink] = React.useState(false);
    const [chatActive, setChatActive] = React.useState(false);
    

    function ProtectedRoutes({ authState, children}){
        return authState === AuthState.Authenticated 
        ? children
        : <Login 
            user = {user}
            authState={authState}
            onAuthChange={(user,authState) => {
                setAuthState(authState);
                setUser(user);
            }}
        />
    
    }

    const chatElement = (
    <Chat
        user={user}
        setUser={setUser}
        linked={linked}
        changeLink={changeLink}
        chatActive={chatActive}
        setChatActive={setChatActive} />
    )

    return ( 
        <Routes>
            <Route path = 'Login' element = {<Login />} />
            <Route path = '/' element = {
                <ProtectedRoutes authState = {authState} >
                    <Layout />
                </ProtectedRoutes>
            }>
                <Route index element={<Chat 
                    user={user}
                    setUser={setUser}
                    linked={linked}
                    changeLink={changeLink}
                    chatActive={chatActive}
                    setChatActive={setChatActive} />} 
                />
                <Route path='Chat' element={<Chat 
                    user={user}
                    setUser={setUser}
                    linked={linked}
                    changeLink={changeLink}
                    chatActive={chatActive}
                    setChatActive={setChatActive} />}
                />
                <Route path = 'Timeline' element={<Timeline user= {user} setUser = {setUser} linked={linked} changeLink={changeLink}/>} />
                <Route path = 'Profile' 
                    element={<Profile 
                        user = {user}
                        authState={authState}
                        onAuthChange={(user,authState) => {
                            setAuthState(authState);
                            setUser(user);
                        }}
                    />} 
                />
                <Route path='*' element={<NotFound />} />
            </Route> 
        </Routes>
    );
   
}
function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
        }        