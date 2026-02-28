import React from "react";
import { Modal } from "react-bootstrap";

export function Search({linked}){
    const [show, setShow] = React.useState(true);
    React.useEffect(() => {
        if (linked === false){
            setShow(true);
        }
    }, [linked]);
    const handleOpen = () => setShow(true);
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
        <Modal size="lg" show = {show} onHide={() => handleClose()} centered backdrop="static" keyboard={false}>
            <Modal.Header>
                Let's turn this from you into Us
            </Modal.Header>
            <Modal.Body>
                <div className="searchBox">
                    <input type="text" placeholder="Search..." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} 
                        style = {{
                            outlineColor: found ? "green" : "red"
                        }}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}