import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from './header_footer'
import { Login } from './login/login'


export default function App() {

    return ( 
        <Routes>
            <Route path = '/' element = {<Login />} exact />
            <Route path = '/header_footer/*' element = {<Layout />} />
        </Routes>
    );
   
}