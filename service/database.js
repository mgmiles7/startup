const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
let db;
let userCollection;
let messageCollection;
let postCollection;


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await client.connect();
    db = client.db('USApp');
    userCollection = db.collection('user');
    messageCollection = db.collection('messages')
    postCollection = db.collection('posts')
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();


async function addUser(user){
    await userCollection.insertOne(user);
}

function getUser(username) {
    return userCollection.findOne({ username: username});
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token});
}

async function updateUser(user){
    await userCollection.updateOne({ username: user.username}, { $set: user});
}

async function updateUserRemoveAuth(user){
    await userCollection.updateOne({ username: user.username}, { $unset: {token: 1} });
}

async function getUserNames(){
    let usernames = await userCollection.find({} , { projection: { username: 1, _id: 0}}).toArray();
    return usernames.map(u => u.username);

}

async function newMessage(message){
    await messageCollection.insertOne(message);
}

async function getMessages(user){
    let messages = await messageCollection.find({sender: { $in: [user.username, user.with]}}).sort({ time: 1}).toArray();
    return messages;
}

async function newPost(post){
    await postCollection.insertOne(post);
}

async function getPosts(user){
    let posts = await postCollection.find({sender: {$in: [user.username, user.with]}}).sort({ time: 1}).toArray();
    return posts;
}

module.exports = {
    addUser,
    getUser,
    getUserByToken,
    updateUser,
    updateUserRemoveAuth,
    getUserNames,
    newMessage,
    getMessages,
    newPost,
    getPosts
}


