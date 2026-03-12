const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let usernames = [];
let messages = new Map();


const port = process.argv.length > 2 ? process.argv[2] : 3000;

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
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//update user
apiRouter.post('/auth/update', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    user = {
        username: user.username,
        linked: req.body.linked,
        with: req.body.with
    }
    res.send({ 
            username: user.username,
            linked: user.linked,
            with: user.with,
        });
})

//get users
apiRouter.get('/auth/users', async (req, res) => {
    res.json(usernames);
})
// send message
apiRouter.post('/auth/sendMessage', async (req, res) =>{
const user = await findUser('token', req.cookies[authCookieName]);
    const message = {
        text: req.body.text,
        time: req.body.time,
        sender: user.username,
        id: uuid.v4(),
    }

    const senderMessages = messages.get(user.username);
    const receiverMessages = messages.get(user.with);

    senderMessag
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
  users.push(user);
  usernames.push(user.username);
  messages.set(user.username, []);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
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