const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

const port = process.env.port || 3000;

// handle bar set up
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});

// app middleware set up
app.use((req, res, next) => {
  const loggerMsg = `${new Date().toString()} ${req.method} ${req.url}` ;
  console.log(loggerMsg);
  fs.appendFile('server.log', loggerMsg + '/n', (err) => {
    if (err) {
      console.log("enable to log message");
      throw new Error(err);
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to the application'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`app server running on port ${port}`);
});