
//NODEMON YÜKLERKEN NPM -İ -D NODEMON OLARAK YAZABİLİRİZ.
//TypeError: fsevents.watch is not a function=> HATASI İÇİN npm audit fix --force kullandım
const express = require('express');
const mongoose= require('mongoose');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db')
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection error:', err));


//TEMPLATE ENGINE
app.set("view engine", "ejs");
//Middlewares
app.use(express.static("public"));
//ROUTES
app.use('/', pageRoute)
app.use('/courses', courseRoute)

const port = 5050;

app.listen(port, () => {
    console.log(`App Started ${port}`);
})