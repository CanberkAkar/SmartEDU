const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const categroy = await Category.create(req.body);
        //YENİ ELEMANDA 201 DÖNER
        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        console.log('Hata:', error);
        req.flash("error", "Bir hata oluştu.");
        res.status(400).redirect('/users/dashboard');
    }
}

exports.deleteCategory= async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        //BAĞLANTILI OLAN ALANLARI DA SİLECEK.
        if (!category) {
            req.flash("error", "Kayıt bulunamadı.");
            return res.status(404).redirect('/users/dashboard');
        }

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        console.log('Hata:', error);
        req.flash("error", "Bir hata oluştu.");
        res.status(400).redirect('/users/dashboard');
    }
};