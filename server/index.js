const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const corsOptions = require('./config/corsOptions');
const dbConnect = require('./config/dbConnect');

const port = process.env.PORT || 5000;
const app = express();

dbConnect();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/user', require('./controllers/user'));
app.use('/api/doc', require('./controllers/doc'));

app.get("/", (req, res) => {
	res.send("<h1>Home route reached");
});

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB server");
	app.listen(port, () => {
		console.log(`Server is listening on ${ port }`);
	});
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}