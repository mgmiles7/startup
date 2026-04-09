import React from 'react';
import { Modal } from "react-bootstrap";
import { Search } from './userSearch';
import { Message } from '../messages';
import { useRef } from 'react';
import { ChatClient, socketMessage } from '../chatClient';
export function Chat(props) {
    React.useEffect(() => {
    console.log("Chat mounted");
    }, []);
    const [message, setMessage] = React.useState([]);
    const [inputMessage, setInputMessage] = React.useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [shouldScroll, setScroll] = React.useState(false);
    const bottomRef = useRef(null);

    
    function createMessage(message, sender) {
        const now = new Date()
        const date = now.toLocaleDateString();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const time = `${date} ${hours}:${minutes}`
        const msg = {
            text: message,
            time: time,
            sender: sender
        }
        return msg;
    }

    function createPost(post, sender, type = 'post') {
            const now = new Date()
            const date = now.toLocaleDateString();
            const hours = now.getHours() % 12 || 12;
            const minutes = (now.getMinutes() < 10) ? "0"+now.getMinutes(): now.getMinutes();
            const time = `${date} ${hours}:${minutes}`;
            const pst = {
                text: post,
                time: time,
                sender: sender,
                type: type
            }
            return pst;
        }

    async function sendMessage(msg, sender){
        let mess = createMessage(msg, sender);
        if (ChatClient.Alive === true){
            let sockM = new socketMessage('message', mess);
            ChatClient.sendMessage(sockM);
        } 
        const response = await fetch('/api/auth/sendMessage', {
            method: 'post',
            body: JSON.stringify(mess),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (ChatClient.Alive === false){
            msg = await response.json();
            if (sender === user.username) setInputMessage("");
            setMessage(prev => [...prev, msg]);    
        }    
        setScroll(true);
        
    }

    async function timelineMessage(pst, sender){
        let pt = createPost(pst, sender, "text");
        const response = await fetch('/api/auth/sendPost', {
            method: 'post',
            body: JSON.stringify(pt),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        pst = await response.json();
        props.setPost(prev => [...prev, pst]);
    }

    async function getMessages(){
        const response = await fetch('/api/auth/getMessages', {
            method: 'get',
        });
        const data = await response.json();
        setMessage(data);
    }

    function socketMessage(message){
        setMessage(prev => [...prev, message])
    }

    React.useEffect(() => {
        ChatClient.addObserveM(socketMessage);
        return () => {
            ChatClient.removeObserverM(socketMessage);
        }
    }, []);

    React.useEffect(() =>{
        if (shouldScroll){
            bottomRef.current?.scrollIntoView({behavior:"smooth"});
            setScroll(false);
        }
    }, [message])

    React.useEffect(() => {
        getMessages();
        const interval = setInterval(getMessages, 3000);
        return () => clearInterval(interval)
    }, []);



    // React.useEffect(() => {
    //     if (!props.chatActive) return;
    //     const id = setInterval(() => {
    //         sendMessage("Less annoying filler message", user.with)
    //     },8000);
    //     return () => clearInterval(id);
    // }, [props.chatActive])
  return (
    <>
    <div className='main chat'>
        <h3>{user.with}</h3>       
            <ul className = "messages hide-scrollbar">
                {message.map((item) =>
                
                <li key={item.id} className= {(item.sender === user.username) 
                    ? "message-sent message" 
                    : "message-received message"}>
                    <div className='bubble'>
                        <button className='wrapper-button' onClick={() => timelineMessage(item.text, user.username)}>
                        {item.text}
                        </button>
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
            <div ref = {bottomRef}/>     
            </ul>
            <div>
            <div className='composer'>
                <div id = 'message-row'>
                <div id = 'message-text' className="input-group"> 
                <input type="text" className="form-control" placeholder="message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}/>
                </div>
                <div>
                <button id = 'send' className="btn btn-primary send" onClick={() => sendMessage(inputMessage, user.username)}>Send</button>
                </div>
                </div>
            </div>
            </div>
    </div>
    <Search linked={props.linked} changeLink={props.changeLink} user={props.user} setUser={props.setUser} chatActive={props.chatActive} setChatActive={props.setChatActive} />
    </>
  );
}