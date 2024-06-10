const express= require('express');

const app=express();

const port=5050;

//NODEMON YÜKLERKEN NPM -İ -D NODEMON OLARAK YAZABİLİRİZ.
//TypeError: fsevents.watch is not a function=> HATASI İÇİN npm audit fix --force kullandım

app.get('/',(req,res)=>{
    res.status(200).send('INDEX');
})
app.listen(port,()=>{
    console.log(`App Started ${port}`);
})