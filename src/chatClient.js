
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
            let message = new socketMessage('join', this.userSocket);
            this.socket.send(JSON.stringify(message));
        }
        this.socket.onmessage = async (event) => {
            const text = JSON.parse(event.data);
            if (text.type === 'join' && text.value.username === user.with){
                this.partnerConnected = true;
            }
            if (text.type === 'disconnect' && text.value.username === user.with){
                this.partnerConnected = false;
            }
            console.log(text.type);
            this.notifyObservers(text);
        };

        this.socket.onclose = (event) => {
            this.Alive = false;
        };     
    }
    
    sendMessage(message){
        this.socket.send(JSON.stringify(message));
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
            this.observersM.forEach((h) => h(message));
        } else if (message.type === 'post'){
            this.observersP.forEach((h) => h(message));
        }
    }
}


export { socketMessage, ChatClient};