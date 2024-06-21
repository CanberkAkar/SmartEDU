const express= require('express');
const categoryController= require("../controllers/categoryController");

//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/').post(categoryController.createCategory);//localhost:3000/categories eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur


module.exports = router;