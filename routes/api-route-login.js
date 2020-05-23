// note in order to use GitHub to authenticate in your Node.js app you need to install: npm install passport-github

const express = require('express');
const app = express();
const passport = require('passport');

app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

// need to redirect to homepage after login is confirmed
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

// flash messages are combined with redirects in order to display status info to user
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// failureFlash
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

// successFlash
passport.authenticate('local', { successFlash: 'Welcome!' });

// custom Callback (probably don't need)
app.get('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});