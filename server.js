const path = require('path');
require('dotenv').config();

const express = require('express');

const routes = require('./controllers');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const hbs = exphbs.create({});
const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Statics assets directory to images, css and front-end js
app.use(express.static(path.join(__dirname, 'public')));

// Router to api folder
app.use(require('./controllers/'));

//TODO: Uncomment section below once seeds and models are complete
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});