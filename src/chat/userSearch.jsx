import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './modal.css'
export function Search({linked, changeLink, user, setUser}){
    const [show, setShow] = React.useState(true);
    React.useEffect(() => {
        if (linked === false){
            setShow(true);
        } else {
            setShow(false);
        }
    }, [linked]);
    const handleClose = () => setShow(false);
    const[userList] = React.useState([
        //simulating a list of users that will be populate a database
        { id: "user1", text: "Rebecca" },
        { id: "user2", text: "John"},
        { id: "user3", text: "Mary"},
        { id: "user4", text: "Charlie"}
    ])
    const [searchItem, setSearchItem] = React.useState('');
    const found = userList.some(
        (item) => item.text === searchItem && searchItem !== ""
    );
    return (
        <Modal size="sm" show = {show} onHide={() => handleClose()} centered backdrop="static" keyboard={false}>
            <Modal.Header className="Header">
                Let's turn this from you into Us
            </Modal.Header>
            <Modal.Body className="Body">
                <div className="searchBox">
                    <input type="text" placeholder="Search user..." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} 
                        style = {{
                            outlineColor: found ? "green" : "red"
                        }}
                    />
                </div>
                <div>
                    <Button disabled={!found} onClick={(() =>
                        {
                            setUser(prev => ({
                                ...prev,
                                linked: true
                            })
                            )
                            changeLink(true);
                        }
                    )}>Link</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}