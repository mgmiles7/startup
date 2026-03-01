import React from 'react';
import "./profile.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
export function Profile(props) {
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('username');
    props.onAuthChange(null, AuthState.Unauthenticated)
    navigate("/");
  }

  return (
    <div className="main">
      <img src="../logo.png" alt="Us logo"/>
            <h2 id = "user">{props.user.username}</h2>
            <p id = 'name'>{`Time with ${props.user.with}`}: 5 months</p>
            <div>
            <button className="btn btn-primary send" type="submit">Idea please!</button>
            <button className="btn btn-outline-primary" onClick={() => logout()} >Log-out</button>
            </div>
    </div>
  );
}