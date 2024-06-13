const express= require('express');
const courseController= require("../controllers/courseController");

//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/').post(courseController.createCourse);//localhost:3000/courses eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur

module.exports = router;