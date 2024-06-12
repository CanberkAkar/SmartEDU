
//NODEMON YÜKLERKEN NPM -İ -D NODEMON OLARAK YAZABİLİRİZ.
//TypeError: fsevents.watch is not a function=> HATASI İÇİN npm audit fix --force kullandım
const express = require('express');
const app = express();
const port = 5050;
const pageRoute = require('./routes/pageRoute')
//TEMPLATE ENGINE
app.set("view engine", "ejs");
//Middlewares
app.use(express.static("public"));
//ROUTES
app.use('/', pageRoute)

app.listen(port, () => {
    console.log(`App Started ${port}`);
})