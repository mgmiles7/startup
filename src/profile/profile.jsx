import React from 'react';
import "./profile.css"
import { Link } from "react-router-dom";

export function Profile() {

  return (
    <div className="main">
      <img src="../logo.png" alt="Us logo"/>
            <h2>Morgan</h2>
            <p id = 'name'>Time with Rebecca: 5 months</p>
            <div>
            <button className="btn btn-primary send" type="submit">Idea please!</button>
            <button className="btn btn-outline-primary" type="submit"><Link id="log-out" to="../../">Log out</Link></button>
            </div>
    </div>
  );
}