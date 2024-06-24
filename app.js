
//NODEMON YÜKLERKEN NPM -İ -D NODEMON OLARAK YAZABİLİRİZ.
//TypeError: fsevents.watch is not a function=> HATASI İÇİN npm audit fix --force kullandım
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db')
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection error:', err));


//TEMPLATE ENGINE
app.set("view engine", "ejs");


//Global Variable

global.userIN = null; //JS'DE FALSE OLARAK DA KULLANILIR. DEĞERİ VARSA YOKSA DİYE BAKILACAK


//Middlewares

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
const port = 5050;

app.listen(port, () => {
    console.log(`App Started ${port}`);
})