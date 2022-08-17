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