const express= require('express');
const pageController= require("../controllers/pageController");

//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);

module.exports = router;