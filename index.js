const path = require('path');
const express = require('express');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyParser = require('body-parser');

const authMiddleware = require('./lib/middleware/auth');

const {
  sequelize,
} = require('./models');

const app = express();


const myStore = new SequelizeStore({
  db: sequelize,
});
app.use(session({
  secret: 'Super secret String',
  store: myStore,
  resave: false,
  proxy: true,
}));
myStore.sync();


app.use(bodyParser.json());

app.use('/public', express.static('public'));

app.use('/rest', require('./rest'));
app.use('/login', require('./lib/middleware/login'));
app.use('/register', require('./lib/middleware/register'));


app.get('/', authMiddleware('redirect'), (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/views/index.html`));
});

app.listen(8000);
