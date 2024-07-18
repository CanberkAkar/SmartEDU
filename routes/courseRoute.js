const express= require('express');
const courseController= require("../controllers/courseController");
const roleMiddleware= require('../middlewares/roleMiddleware');

//APP JS'DEN BİR İSTEK GELİYOR.HTTP İSTEKLERİ İLGİLİ ROTALARA GÖNDERİYOR. ROUTER BUNU SAĞLIYOR.
const router = express.Router();
router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse);//localhost:3000/courses eğer route'a yeni bir veri gelirse mesela '/add' gibi yolu artık /courses/add olur
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourese);
router.route('/release').post(courseController.releaseCourese);
router.route('/:slug').delete(courseController.deleteCourse);
module.exports = router;