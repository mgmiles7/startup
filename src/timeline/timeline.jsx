import React from 'react';

export function Timeline() {
  return (
    <div className='main timeline'>
      <h3>Our Story</h3> 
            <ul id = "timeline-list">
                <li className="post">
                    <div className="post-text">
                        We got to go night-skiing and the snow was just perfect! the hot cocoa after was
                        great too!
                    </div>
                    <span className="timestamp">
                        December 23 at 11:42
                    </span>
                </li>
                <li className = "post">
                    <div className="post-text saved-message">
                        I just booked our appointment at the gallery! soo excited!
                    </div>
                    <span className="timestamp">
                        saved on Dec 27 at 9:38 
                    </span>
                </li>
                <li className="post">
                    <div className="post-text">
                        we looked through the whole gallery and finally in the last room we found the 
                        perfect painting for our apartment!!
                    </div>
                    <span className="timestamp">
                        Jan 4 at 7:44 
                    </span>
                </li>
                <li className="post">
                    <div className="post-text">
                        during our lunch break we met up at this little french bakery and it was soo good!
                    </div>
                    <span className="timestamp">
                        Jan 14 at 5:12 
                    </span>
                </li>
            </ul>
            <form method="post" action="post_entry">
                  <div id='message-row'>
                    <div id = 'message-text' className="input-group"> 
                    <input type="text" className="form-control" placeholder="start remebering..."/>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary send" id = 'send'>Post</button>
                    </div>
                  </div>
            </form>
            
    </div>
  );
}