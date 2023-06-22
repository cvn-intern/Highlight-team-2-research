const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const db = require('./db');

const authMiddleware = require('./authMiddleware')

const BUILD_PATH = path.join(__dirname, '../build');
const JWT_SECRET_KEY = 'MY_SECRET_KEY';

const ONE_HOUR_MS = 1000 * 60 * 60;
// const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;

const app = express();

const IS_PROD = process.env.NODE_ENV !== 'development';
console.log(IS_PROD);
console.log('Starting for production:', IS_PROD);

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});



  ///////////////////-----------CSRF PREVENTION---------------////////////////////////////////
// app.get('/user', (req, res) => {
//   const { session } = req.cookies;
//   const token = jwt.sign({ session: session }, JWT_SECRET_KEY, {expiresIn: "59m"})
//   const user = db.getUser(session);
//   if (!user) {
//     res.status(200).json(null);
//   } else {
//     res.status(200).json({user, token});
//   }
// });
///////////////////-------------------END------------------////////////////////////////////



///////////////////--------------CSRF-------------------////////////////////////////////
app.get('/user', (req, res) => {
  const { session } = req.cookies;
  const user = db.getUser(session);
  if (!user) {
    res.status(200).json(null);
  } else {
    res.status(200).json(user);
  }
});
///////////////////-------------------END------------------////////////////////////////////

app.get('*', (req, res) => {
  res.redirect('/');
});

// Login route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username == null || password == null || username.length < 1 || password.length < 1) {
//     return res.status(400).end();
//   }
//   const sessionID = db.handleLogin(username, password);
//   res
//     .cookie('session', sessionID, {
//       maxAge: ONE_HOUR_MS,
//       sameSite: 'None',
//       secure: IS_PROD,
//     })
//     .redirect('/');
// });


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username == null || password == null || username.length < 1 || password.length < 1) {
    return res.status(400).end();
  }
  const sessionID = db.handleLogin(username, password);
  console.log(sessionID)
  //create jwt token
  // const token = jwt.sign({ sessionID: sessionID }, JWT_SECRET_KEY, {expiresIn: "59m"})
  res.cookie('session', sessionID, {
    maxAge: ONE_HOUR_MS,
    sameSite: 'None',
    secure: IS_PROD,
  }).redirect('/')
});

app.post('/transfer',authMiddleware.authenticateToken, (req, res) => {
  const { amount, description, to, date } = req.body;
  const floatAmount = parseFloat(amount);

  if (
    isNaN(floatAmount) ||
    floatAmount <= 0 ||
    description == null ||
    description == '' ||
    to == null ||
    to == ''
  ) {
    return res.status(400).end();
  }

  const updatedUser = db.makeTransfer(req.user, floatAmount, to, description);
  if (updatedUser === false) {
    return res.status(401).json({ error: "You don't have enough balance.", success: false });
  }
  res.status(200).json({ user: updatedUser, success: true });
});

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
