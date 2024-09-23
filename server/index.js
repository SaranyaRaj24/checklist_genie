require('dotenv').config();
require('./scripts/authentication');
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const port = 5002;
const app = express();


app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('<center><a href="/auth/google"><button>SIGN IN</button></a></center>');
});


app.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const profile = req.user;
  
  
  const token = jwt.sign(
    {
      id: profile.id,
      email: profile.email,
      name: profile.displayName,
      picture: profile.photos[0].value, 
    },
    process.env.SECRET, 
  );

 

  
  res.json({
    message: 'Authentication successful!',
    user: {
      id: profile.id,
      name: profile.displayName,
      email: profile.email,
    },
    token,  
  });
});



app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/failure', (req, res) => {
  res.send('Failed...!');
});

app.get('/unauthorized', (req, res) => {
  res.send('<center> HELLO!!!</center>');
});


app.listen(port, () => {
  console.log('Server is running on port ' + port);
});


// require('dotenv').config();
// require('./scripts/authentication');
// const express = require('express');
// const session = require('express-session');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const port = 5002;
// const app = express();

// // Express session setup
// app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.get('/', (req, res) => {
//   res.send('<center><a href="/auth/google"><button>SIGN IN</button></a></center>');
// });

// // Google OAuth callback route
// app.get('/google/callback', passport.authenticate('google', {
//   failureRedirect: '/failure'  // Redirect to failure page if authentication fails
// }), (req, res) => {
//   const profile = req.user;
  
//   // Generate JWT token
//   const token = jwt.sign(
//     {
//       id: profile.id,
//       email: profile.email,
//       name: profile.displayName,
//       picture: profile.photos[0].value, 
//     },
//     process.env.SECRET, 
//     { expiresIn: '1h' }
//   );
  
//   // Set token in session or as a cookie
//   req.session.token = token;  // Save token in session

//   // Redirect to a protected page (e.g., dashboard)
//   res.redirect('/google/callback');
// });

// // Google authentication route
// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// // Failure route
// app.get('/failure', (req, res) => {
//   res.send('Failed...!');
// });

// // Protected dashboard route (only accessible if logged in)
// app.get('/dashboard', (req, res) => {
//   if (!req.session.token) {
//     return res.redirect('/unauthorized');
//   }
  
//   res.send('<center><h1>Welcome to the dashboard!</h1></center>');
// });

// // Unauthorized route
// app.get('/unauthorized', (req, res) => {
//   res.send('<center><h1>You are not authorized!</h1></center>');
// });

// // Start server
// app.listen(port, () => {
//   console.log('Server is running on port ' + port);
// });
