const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js')

const authCookieName = 'token';

let users = [];
let usernames = [];
let messages = new Map();
let posts = new Map();


const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user'});
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ 
            username: user.username,
            linked: user.linked,
            with: user.with,

        });
    }
})

//login existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ 
            username: user.username,
            linked: user.linked,
            with: user.with,

        });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//update user
apiRouter.post('/auth/update', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    user.linked = req.body.linked;
    user.with = req.body.with;
    await DB.updateUser(user);
    res.send({ 
            username: user.username,
            linked: user.linked,
            with: user.with,
        });
})

//get users
apiRouter.get('/auth/users', async (req, res) => {
    let names = await DB.getUserNames()
    res.json(names);
})
// send message
apiRouter.post('/auth/sendMessage', async (req, res) =>{
const user = await findUser('token', req.cookies[authCookieName]);
    const message = {
        text: req.body.text,
        time: req.body.time,
        sender: req.body.sender,
        id: uuid.v4(),
    }

    const senderMessages = messages.get(user.username);
    const receiverMessages = messages.get(user.with);

    senderMessages.push(message);
    receiverMessages.push(message)
    console.log(message)
    res.json(message);

})

//get messages
apiRouter.get('/auth/getMessages', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userMessages = messages.get(user.username) || [];
    console.log(userMessages)
    res.json(userMessages);
})

// send post
apiRouter.post('/auth/sendPost', async (req, res) =>{
const user = await findUser('token', req.cookies[authCookieName]);
    const post = {
        text: req.body.text,
        time: req.body.time,
        sender: req.body.sender,
        type: req.body.type,
        id: uuid.v4(),
    }

    const senderPosts = posts.get(user.username);
    const receiverPosts = posts.get(user.with);

    senderPosts.push(post);
    receiverPosts.push(post)
    res.json(post);

})

//get messages
apiRouter.get('/auth/getPosts', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userPosts = posts.get(user.username) || [];
    res.json(userPosts);
})

//verification check
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};



async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    linked: false,
    with: null
  };
  await DB.addUser(user)
  // users.push(user);
  // usernames.push(user.username);
  // messages.set(user.username, []);
  // posts.set(user.username, [])

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

//setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});