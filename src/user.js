export class User {
    constructor(username, password){
        this.linked = false;
        this.password = password
        this.username = username;
        this.messages = [];
        this.posts = [];
    }
}