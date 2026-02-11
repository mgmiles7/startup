import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
     <div className = "body">
        <header>
            <img src="/logo.png" alt="Us logo" id="logo"/>
        </header>
        <main>
            <h2>Sign in</h2>
            <form method="get" action="chat.html">
                <div className="input-group">
                    <span className="input-group-text" id="visible-addon">👋</span>
                    <input type="text" className="form-control" placeholder="username" aria-label="username" aria-describedby="visible-addon"/>
                </div>
                <div className="input-group">
                    <span className="input-group-text" id="visible-addon">🔒</span>
                    <input type="text" className="form-control" placeholder="password" aria-label="password" aria-describedby="visible-addon"/>
                </div>
                <div id="buttons">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
            </form>
        </main>
        <footer>
            <hr/>
            <p>Morgan Miles | <a href="https://github.com/mgmiles7/startup">GitHub</a> </p>
        </footer>
    </div>
    );
}