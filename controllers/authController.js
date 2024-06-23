//COMMINTIY ISMI
const User = require('../models/User');
const bcrypt= require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        //YENİ ELEMANDA 201 DÖNER
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail', 
            error
        })
    }
}

//Async/await kullanarak hata yönetimini ve kullanıcıya verilen geri bildirimleri iyileştiriyor,

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect password'
            });
        }

        // USER SESSION
        req.session.userID=user._id;
        res.status(200).redirect('/');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message || 'An error occurred'
        });
    }
};