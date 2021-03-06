const express = require('express');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const { clientRouter } = require('./routers/client');
const { homeRouter } = require('./routers/home');
const { db } = require('./utils/db');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.engine('.hbs', hbs({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/client', clientRouter);
app.get('/test', (req, res) => {
  res.send(db.getAll());
});

app.listen(3000, 'localhost');
