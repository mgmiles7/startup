
class socketMessage {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

class ChatClient {
    observersM = []
    observersP = []
    Alive = false;
    userSocket = null;
    partnerConnected = false;

    constructor(user){
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            this.userSocket = user;
            this.Alive = true
            let message = new socketMessage('connect', this.userSocket);
            this.socket.send(JSON.stringify(message));
        }
        this.socket.onmessage = async (event) => {
            const raw = await event.data.text();
            const text = JSON.parse(raw);
            if (text.type === 'message'){
                this.notifyMessage(text.value);
            } else if (text.type === 'post'){
                this.notifyPost(text.value);
            } else if (text.type === 'disconnect'){
                this.partnerConnected = false;
            } else if (text.type === 'connect'){
                this.partnerConnected = true;
            }  
        };

        this.socket.onclose = (event) => {
            this.connected = false;
            let message = new socketMessage('disconnect', this.userSocket)
            this.socket.send(JSON.stringify(message));
        };     
    }
    
    sendMessage(message){
        this.socket.send(JSON.stringify(message));
        if (message.type === 'message'){
                this.notifyMessage(text.value);
            } else if (message.type === 'post'){
                this.notifyPost(text.value);
            } else if (message.type === 'disconnect'){
                this.Alive = false;
            } else if (message.type === 'connect'){
                this.Alive = true;
            }
    }

    returnMessage(text){
        return text
    }

    addObserverM(observer){
        this.observersM.push(observer);
    }

    removeObserverM(observer){
        this.observersM.filter((m) => m !== observer);
    }

    addObserverP(observer){
        this.observersP(observer);
    }

    notifyObservers(message){
        if (message.type === 'message'){
            this.observersM.forEach((h) => h(message));
        } else if (message.type === 'post'){
            this.observersP.forEach((h) => h(message));
        }
    }
}

const ChatClient = new ChatClient();
export { socketMessage, ChatClient};