import React from 'react';
import { Post } from '../posts';

export function Timeline(props) {
    
    const [inputPost, setInputPost] = React.useState("")
    const user = JSON.parse(localStorage.getItem('user'));
    
    function createPost(post, sender, type = 'post') {
        const now = new Date()
        const date = now.toLocaleDateString();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const time = `${date} ${hours}:${minutes}`
        const pst = {
            text: post,
            time: time,
            sender: sender,
            type: type
        }
        return pst;
    }

    async function sendPost(pst, sender){
        let pt = createPost(pst, sender);
        const response = await fetch('/api/auth/sendPost', {
            method: 'post',
            body: JSON.stringify(pt),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        pst = await response.json();
        setInputPost("");
        props.setPost(prev => [...prev, pst]);
    }

    async function getPosts(){
        const response = await fetch('/api/auth/getPosts', {
            method: 'get',
        });
        const data = await response.json();
        props.setPost(prev => {
            if (JSON.stringify(prev) === JSON.stringify(data)){
                return prev;
            }
            return data;
        });
    }

    React.useEffect(() => {
        getPosts();
        const interval = setInterval(getPosts, 7000);
        return () => clearInterval(interval)
    }, []);


  return (
    <div className='main timeline'>
      <h3>Our Story</h3> 
            <ul id = "timeline-list">
                {props.post.map((item) =>
                <li key={item.id} className="post">
                    <div className={item.type === "post" ? 'post-text': 'saved-message bubble'}>
                        {item.text}
                    </div>
                    <span className='timestamp'>{item.time}</span>
                </li>)}
                {/* <li className="post">
                    <div className="post-text">
                        We got to go night-skiing and the snow was just perfect! the hot cocoa after was
                        great too!
                    </div>
                    <span className="timestamp">
                        December 23 at 11:42
                    </span>
                </li>*/}
            </ul>
            <div>
                  <div id='message-row'>
                    <div id = 'message-text' className="input-group"> 
                    <input type="text" className="form-control" placeholder="start remebering..." value={inputPost} onChange={(e) => setInputPost(e.target.value)}/>
                    </div>
                    <div>
                    <button className="btn btn-primary send" id = 'send' onClick={() => sendPost(inputPost, user.username)}>Post</button>
                    </div>
                  </div>
            </div>
            
    </div>
  );
}