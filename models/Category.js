const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const slugify = require('slugify');

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug:{
        type:String,
        unique:true
    }
});
//SLUGIFY YÖNLENDİRME YAPARKEN KULLANDIĞIMIZ BİR ALAN
CategorySchema.pre('validate',function(next){
    this.slug=slugify(this.name,{
        lower:true,
        strict:true
    })
    next();
})
const Category= mongoose.model('Category',CategorySchema);
module.exports =Category;