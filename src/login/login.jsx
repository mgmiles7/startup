import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import { User } from '../user';
import './login.css'

export function Login(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        navigate("/header_footer");
    }
    // async function loginUser() {
    //     const user = new User(userName, password);
    //     localStorage.setItem('user', JSON.stringify({
    //         userName: user.username,
    //         password: password
    //     }))
    //     localStorage.setItem('username', userName);
    //     props.onAuthChange(user, AuthState.Authenticated);

    // }

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
        navigate("/header_footer");
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
        navigate("/header_footer");
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            props.onAuthChange(user, AuthState.Authenticated);

        }
    }


    // async function createUser() {
    //     const user = new User(userName, password);
    //     localStorage.setItem('username', userName)
    //     props.onAuthChange('', AuthState.Authenticated)
    //     props.onAuthChange(user, AuthState.Authenticated)

    // }
    
    
    
  return (
      <div className='body'>
        <header>
            <img src="logo.png" alt="Us logo" id="logo"/>
        </header>
        <main>
            <h2>Sign in</h2>
            <form method="get" onSubmit={handleSubmit}>
                <div className="input-group">
                    <span className="input-group-text" id="visible-addon">👋</span>
                    <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username" aria-label="username" aria-describedby="visible-addon"/>
                </div>
                <div className="input-group">
                    <span className="input-group-text" id="visible-addon">🔒</span>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" aria-label="password" aria-describedby="visible-addon"/>
                </div>
                <div id="buttons">
                <button onClick={() => loginUser()} className="btn btn-primary">Login</button>
                <button onClick={() => createUser()} className="btn btn-primary">Create Account</button>
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