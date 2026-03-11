import React from 'react';
import { Post } from '../posts';

export function Timeline(props) {
    const [post, setPost] = React.useState('');
    function sendPost(post) {
            const now = new Date()
            const date = now.toLocaleDateString();
            const hours = now.getHours() - 12;
            const minutes = now.getMinutes();
            const time = `${date} ${hours}:${minutes}`
            const id = now.getMilliseconds();
            const pos = new Post(post, props.user.username, time, id)
            props.setUser(prev => ({
                ...prev,
                posts: [...prev.posts, pos]
            }))
        }

  return (
    <div className='main timeline'>
      <h3>Our Story</h3> 
            {/* <ul id = "timeline-list">
                {props.user.posts.map((item) =>
                <li key={item.id} className="post">
                    <div className='post-text'>
                        {item.text}
                    </div>
                    <span className='timestamp'>{item.timestamp}</span>
                </li>)}
                {/* <li className="post">
                    <div className="post-text">
                        We got to go night-skiing and the snow was just perfect! the hot cocoa after was
                        great too!
                    </div>
                    <span className="timestamp">
                        December 23 at 11:42
                    </span>
                </li>
                 
            </ul> */}
            <div>
                  <div id='message-row'>
                    <div id = 'message-text' className="input-group"> 
                    <input type="text" className="form-control" placeholder="start remebering..." value={post} onChange={(e) => setPost(e.target.value)}/>
                    </div>
                    <div>
                    <button className="btn btn-primary send" id = 'send' onClick={() => sendPost(post)}>Post</button>
                    </div>
                  </div>
            </div>
            
    </div>
  );
}