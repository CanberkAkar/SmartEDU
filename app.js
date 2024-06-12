
//NODEMON YÜKLERKEN NPM -İ -D NODEMON OLARAK YAZABİLİRİZ.
//TypeError: fsevents.watch is not a function=> HATASI İÇİN npm audit fix --force kullandım
const express= require('express');
 
const app=express();

const port=5050;

//TEMPLATE ENGINE

app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));


//ROUTES
app.get('/',(req,res)=>{
    res.status(200).render('index',{
        page_name:"index"
    });
})
app.get('/about',(req,res)=>{
    res.status(200).render('about',{
        page_name:"about"
    });
})

app.listen(port,()=>{
    console.log(`App Started ${port}`);
})