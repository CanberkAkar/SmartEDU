const express= require('express');
const authController= require("../controllers/authController");
const authMiddleware= require('../middlewares/authMiddleware');
const User = require('../models/User');

const { body } = require('express-validator');
//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),


        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],
authController.createUser);//localhost:3000/user/signup eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/login').post(authController.loginUser);//localhost:3000/user/login eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/logout').get(authController.logoutUser);//localhost:3000/user/logout eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);//localhost:3000/user/logout eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
