export class User {
    constructor(username, password){
        this.username = username;
        this.password = password
        this.linked = false;
        this.with = '🤍'
        this.messages = [];
        this.posts = [];
    }
}