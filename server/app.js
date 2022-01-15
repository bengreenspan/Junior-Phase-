const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')


// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, '../client/index.html'))
  }
  catch(ex){
    next(ex)
  }
}); 

app.use('/api', require('./api'))

app.use((req, res, next) => { 
  const error = Error(`<h1>Page not found</h1> The page you requested does not exist <a href='/'>Go back home.</a>`);
  error.status = 404;  
  next(error)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Server Error');
});

module.exports = app;