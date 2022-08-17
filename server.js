const exphbs = require('express-handlebars');

const hbs = exphbs.create({});


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
