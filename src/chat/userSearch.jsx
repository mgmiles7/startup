import React from "react";
import { Modal } from "react-bootstrap";

export function Search(){
    const [show, setShow] = React.useState(true);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const[userList] = React.useState([
        //simulating a list of users that will be populated by a database
        { id: "user2", text: "001" },
        { id: "user3", text: "John"},
        { id: "user4", text: "Mary"},
        { id: "user5", text: "Rebecca"}
    ])
    const [searchItem, setSearchItem] = React.useState('');
    return (
        <Modal size="lg" show = {show} onHide={() => handleClose()} centered backdrop="static" keyboard={false}>
            <Modal.Header>
                Let's turn this from you into Us
            </Modal.Header>
            <Modal.Body>
                {/* <input type="text" placeholder="Search..." value={searchItem} onChange={(e) => setSearchItem(e.target.value.toLocaleLowerCase())} /> */}
                Hello
            </Modal.Body>
        </Modal>
    );
}