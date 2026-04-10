
class socketMessage {
    constructor(type, from, to, value){
        this.type = type;
        this.from = from;
        this.to = to
        this.payload = value;
    }
}

class ChatClient {
    observersM = []
    observersP = []
    Alive = false;
    userSocket = null;

    constructor(user){
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            this.userSocket = user;
            this.Alive = true
            let message = new socketMessage('join', this.userSocket.username, this.userSocket.with, "defaultJoin");
            this.socket.send(JSON.stringify(message));
        }
        this.socket.onmessage = async (event) => {
            const text = JSON.parse(event.data);
            this.notifyObservers(text);
        };

        this.socket.onclose = (event) => {
            this.Alive = false;
        };     
    }
    
    sendMessage(message){
        this.socket.send(JSON.stringify(message));
        this.notifyObservers(message);
    }


    addObserverM(observer){
        this.observersM.push(observer);
    }

    removeObserverM(observer){
        this.observersM = this.observersM.filter((m) => m !== observer);
    }

    addObserverP(observer){
        this.observersP.push(observer);
    }

    notifyObservers(message){
        if (message.type === 'message'){
            this.observersM.forEach((h) => h(message.payload));
        } else if (message.type === 'post'){
            this.observersP.forEach((h) => h(message.payload));
        }
    }
}


export { socketMessage, ChatClient};