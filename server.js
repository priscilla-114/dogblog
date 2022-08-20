const path = require('path');
require('dotenv').config();

const express = require('express');

const helpers = require('./utilities/helpers')

const routes = require('./controllers/index');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const hbs = exphbs.create({ helpers });
const app = express();

const PORT = process.env.PORT || 3001;

//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Statics assets directory to images, css and front-end js
app.use(express.static(path.join(__dirname, 'public')));

// Router to api folder
app.use(require('./controllers/'));

//TODO: Uncomment section below once seeds and model are complete
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));



