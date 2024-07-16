//COMMINTIY ISMI
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { query, validationResult } = require('express-validator');
const bcrypt= require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        //YENİ ELEMANDA 201 DÖNER
        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.array()[0].msg);
      
        for (let i = 0; i <errors.array().length; i++) {
          req.flash("error", `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/register');
      
    }
}

//Async/await kullanarak hata yönetimini ve kullanıcıya verilen geri bildirimleri iyileştiriyor,

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "User Not Match");
            res.status(400).redirect('/login');
            //redirect yapmazsan flash çıkmaz
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const errors = validationResult(req);
              req.flash("error", "User Info Not Match");
              res.status(400).redirect('/login');

        }

        // USER SESSION
        req.session.userID=user._id;
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash("error", "User Not Defined");

    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(()=> {
      res.redirect('/');
    })
}
  exports.getDashboardPage = async(req, res) => {
    const user= await User.findOne({_id:req.session.userID}).populate('courses');
    const courses= await Course.find({user:req.session.userID})
    const categories = await Category.find();
    res.status(200).render('dashboard', {
        page_name: "dashboard",
        user,
        categories,
        courses
    });
}
  