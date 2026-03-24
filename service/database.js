const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const messageCollection = db.collection('messages')
const postCollection = db.collection('posts')

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
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

function getUser(email) {
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

function getUserNames(){
    let usernames = userCollection.find({} , { projection: { username: 1, _id: 0}}).toArray();
    return usernames.map(u => u.username);

}



