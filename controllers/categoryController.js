const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const categroy = await Category.create(req.body);
        //YENİ ELEMANDA 201 DÖNER
        res.status(201).json({
            status: 'success',
            categroy
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}