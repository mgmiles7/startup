const ChatEvent = {
    System: 'system',
    
}

class socketMessage {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

class ChatClient {
    observers = []
    connected = false;
    userSocket;

    constructor(user){
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            this.userSocket = user;
            this.userSocket.type = 'connect';
            socket.send(JSON.stringify(user));


        }
    }
}