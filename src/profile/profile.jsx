import React from 'react';
import "./profile.css"

export function Profile() {
  return (
    <div className="main">
      <img src="../logo.png" alt="Us logo"/>
            <h2>Morgan</h2>
            <p id = 'name'>Time with Rebecca: 5 months</p>
            <div>
            <button className="btn btn-primary send" type="submit">Idea please!</button>
            <button className="btn btn-outline-primary" type="submit"><a id="log-out" href="index.html">Log out</a></button>
            </div>
    </div>
  );
}