const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        });
        //YENİ ELEMANDA 201 DÖNER
        req.flash("success", "Courses created");
        res.status(201).redirect('/courses');
    } catch (error) {
        req.flash("error", "Something happend");
        res.status(400).redirect('/courses');
    }
}

exports.getAllCourses = async (req, res) => {
    try {

        const categorySlug = req.query.categories;
        const query = req.query.search;
        const category = await Category.findOne({ slug: categorySlug })

        let filter = {};
        if (categorySlug) {
            filter = { category: category._id }
        }
        if (query) {
            filter = { name: query }
        }
        if (!query && !categorySlug) {
            filter.name = '';
            filter.category = null;
        }
        const courses = await Course.find({
            $or: [
                { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                { category: filter.category }
            ]
        });
        const categories = await Category.find();
        res.status(200).render('courses', {
            courses,
            categories,
            page_name: "courses"

        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}


exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');

        res.status(200).render('course', {
            course,
            page_name: "courses",
            user

        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.enrollCourese = async (req, res) => {
    try {
        //işlemler sıralı şekilde olmalı o yüzden await kullanıyoruz.

        const user = await User.findById(req.session.userID);
        await user.courses.push({ _id: req.body.course_id });
        await user.save();
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
exports.releaseCourese = async (req, res) => {
    try {
        //işlemler sıralı şekilde olmalı o yüzden await kullanıyoruz.

        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
//REMOTE YERİNE DELETE KULLANMAMIZ GEREKIYOR. FONKSİYONDAN KAYNAKLI

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ slug: req.params.slug });
        if (!course) {
            req.flash("error", "Kayıt bulunamadı.");
            return res.status(404).redirect('/users/dashboard');
        }

        req.flash("success", `${course.name} başarıyla silindi.`);
        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        console.log('Hata:', error);
        req.flash("error", "Bir hata oluştu.");
        res.status(400).redirect('/users/dashboard');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        course.name        = req.body.name;
        course.description = req.body.description;
        course.category    = req.body.category;
        course.save();

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        console.log('Hata:', error);
        req.flash("error", "Error.");
        res.status(400).redirect('/users/dashboard');
    }
};
