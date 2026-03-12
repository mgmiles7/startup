import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './modal.css'
export function Search({linked, changeLink, user, setUser, chatActive, setChatActive}){
    const [show, setShow] = React.useState(true);
    React.useEffect(() => {
        if (linked === false){
            setShow(true);
        } else {
            setShow(false);
        }
    }, [linked]);
    const handleClose = () => setShow(false);
    // const users = React.useState([
    //     //simulating a list of users that will be populate a database
    //     { id: "user1", text: "Rebecca" },
    //     { id: "user2", text: "John"},
    //     { id: "user3", text: "Mary"},
    //     { id: "user4", text: "Charlie"}
    // ])

    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        getUsers();
    }, [])



    async function getUsers() {
        const response = await fetch('/api/auth/users', {
            method: 'get',
        });
        let users =  await response.json();
        setUserList(users);

    }

    async function updateUser(username) {
        const response = await fetch('/api/auth/update', {
            method: 'post',
            body: JSON.stringify({
                linked: 'true',
                with: username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        let user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
    }

    

    const [searchItem, setSearchItem] = React.useState('');
    const found = userList.some(
        (item) => item === searchItem && searchItem !== ""
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
                            updateUser(searchItem);
                            setChatActive(true);
                            console.log(setChatActive);
                            changeLink(true);
                            
                        }
                    )}>Link</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}