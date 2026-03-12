import React from 'react';
import "./profile.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
export function Profile(props) {
  const [showApi, setAPI] = React.useState(false);
  const navigate = useNavigate();
  // function logoutOld(){
  //   localStorage.removeItem('username');
  //   props.onAuthChange(null, AuthState.Unauthenticated)
  //   navigate("/");
  // }
  const user = JSON.parse(localStorage.getItem('user'));
  function logout() {
    fetch('/api/auth/logout', {
      method: 'delete',
    })
      .catch (() => {
        //Logoout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('user');
        props.onAuthChange(null, AuthState.Unauthenticated);
        navigate("/");
      });
  }

  function apiHandler() {
    setAPI(!showApi);
  }

  return (
    <div className="main">
      <img src="../logo.png" alt="Us logo"/>
            <h2 id = "user">{user.username}</h2>
            <p id = 'name'>{`Time with ${user.with}`}: 5 months</p>
            <div>
            <button className="btn btn-primary send" onClick={() => apiHandler()}>Idea please!</button>
            <button className="btn btn-outline-primary" onClick={() => logout()} >Log-out</button>
            </div>
            {showApi &&
              <div>
                Try growing a bonsai tree!
              </div>}
    </div>
  );
}