//import express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({ path: 'variables.env' });

//db.authenticate().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

//setting express
const app = express();

//enable pug
app.set('view engine', 'pug');

//add the views
app.set('views', path.join(__dirname, './views'));

//load a static folder
app.use(express.static('public'));
// Validate if we are developing or producing
const config = configs[app.get('env')];

//Create the variable for the website
app.locals.titulo = config.nombre;

// Show the actual year
app.use((req, res, next) => {
	//create new date
	const fecha = new Date();
	res.locals.fechaActual = fecha.getFullYear();
	res.locals.ruta = req.path;
	return next();
});

app.use(bodyParser.urlencoded({ extended: true }));

//load the routes
app.use('/', routes());

//Puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3002;

app.listen(port, host, () => {
	console.log('El servidor esta funcionando');
});
