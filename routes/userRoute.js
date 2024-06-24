const express= require('express');
const authController= require("../controllers/authController");

//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/signup').post(authController.createUser);//localhost:3000/user/signup eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/login').post(authController.loginUser);//localhost:3000/user/login eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/logout').get(authController.logoutUser);//localhost:3000/user/logout eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur


module.exports = router;
