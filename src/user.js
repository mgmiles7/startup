export class User {
    constructor(username, password){
        this.linked = false;
        this.with = '🤍'
        this.password = password
        this.username = username;
        this.messages = [];
        this.posts = [];
    }
}