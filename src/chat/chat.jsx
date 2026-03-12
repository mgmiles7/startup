import React from 'react';
import { Modal } from "react-bootstrap";
import { Search } from './userSearch';
import { Message } from '../messages';
export function Chat(props) {
    React.useEffect(() => {
    console.log("Chat mounted");
    }, []);
    const [message, setMessage] = React.useState([]);
    const [inputMessage, setInputMessage] = React.useState("")
    const user = JSON.parse(localStorage.getItem('user'));
    function createMessage(message) {
        const now = new Date()
        const date = now.toLocaleDateString();
        const hours = now.getHours() - 12;
        const minutes = now.getMinutes();
        const time = `${date} ${hours}:${minutes}`
        //const id = now.getMilliseconds();
        const msg = {
            text: message,
            time: time,
        }
        return msg;
        // const mess = new Message(message, props.user.username, time, id)
        // props.setUser(prev => ({
        //     ...prev,
        //     messages: [...prev.messages, mess]
        // }))
    }

    async function sendMessage(msg){
        let mess = createMessage(msg);
        const response = await fetch('/api/auth/sendMessage', {
            method: 'post',
            body: JSON.stringify(mess),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        msg = await response.json();
        setMessage(prev => [...prev, msg]);
    }

    async function getMessages(){
        const response = await fetch('/api/auth/getMessages', {
            method: 'get',
        });
        const data = await response.json();
        console.log("server returned:", data);
        console.log("is array?", Array.isArray(data));
        setMessage(data);
    }

    React.useEffect(() => {
        getMessages();
        const interval = setInterval(getMessages, 3000);
        return () => clearInterval(interval)
    }, []);



    React.useEffect(() => {
         if (!props.chatActive) return;
        const id = setInterval(() => {
            let filler = createMessage("Less annoying filler message");
            setMessage(prev => [...prev, filler])
        },8000);
        return () => clearInterval(id);
    }, [props.chatActive])
  return (
    <>
    <div className='main chat'>
        <h3>{user.with}</h3>       
            <ul className = "messages">
                {message.map((item) =>
                <li key={item.id} className= {(item.sender === user.username) 
                    ? "message-sent message" 
                    : "message-received message"}>
                    <div className='bubble'>
                        {item.text}
                    </div>
                    <span className='timestamp'>{item.time}</span>
                </li>)}
                {/* <li className = "message-received message">
                    <div className="bubble">
                        Hey
                    </div>
                    <span className="timestamp">12:14 AM</span>
                </li>
                <li className = "message-sent message">
                    <div className="bubble">
                        How are you?
                    </div>
                    <span className="timestamp"> 1:10 AM</span>
                 */}
            </ul>
            <div>
            <div className='composer'>
                <div id = 'message-row'>
                <div id = 'message-text' className="input-group"> 
                <input type="text" className="form-control" placeholder="message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}/>
                </div>
                <div>
                <button id = 'send' className="btn btn-primary send" onClick={() => sendMessage(inputMessage)}>Send</button>
                </div>
                </div>
            </div>
            </div>
    </div>
    <Search linked={props.linked} changeLink={props.changeLink} user={props.user} setUser={props.setUser} chatActive={props.chatActive} setChatActive={props.setChatActive} />
    </>
  );
}