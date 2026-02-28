import React from 'react';
import { Modal } from "react-bootstrap";
import { Search } from './userSearch';
export function Chat(props) {
  return (
    <>
    <div className='main chat'>
        <h3>{props.linked.id}</h3>       
            <ul className = "messages">
                <li className = "message-received message">
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
                </li>
                <li className = "message-received message">
                    <div className="bubble">
                        doing great! did you see the new trailer
                    </div>
                    <span className="timestamp">8:05 AM</span>
                </li>
                <li className = "message-sent message">
                    <div className="bubble">
                        no net yet
                    </div>
                    <span className="timestamp"> 8:09 AM</span>
                </li>
                <li className = "message-received message">
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
                </li>
                <li className = "message-received message">
                    <div className="bubble">
                        doing great! did you see the new trailer
                    </div>
                    <span className="timestamp">8:05 AM</span>
                </li>
                <li className = "message-sent message">
                    <div className="bubble">
                        no net yet
                    </div>
                    <span className="timestamp"> 8:09 AM</span>
                </li>
            </ul>
            <div>
            <form className='composer' method="post" action="send_message">
                <div id = 'message-row'>
                <div id = 'message-text' className="input-group"> 
                <input type="text" className="form-control" placeholder="message"/>
                </div>
                <div>
                <button id = 'send' type="submit" className="btn btn-primary send">Send</button>
                </div>
                </div>
            </form>
            </div>
    </div>
    <Search linked={props.linked} changeLink={props.changeLink} />
    </>
  );
}