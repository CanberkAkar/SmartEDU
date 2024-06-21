//COMMINTIY ISMI

const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        //YENİ ELEMANDA 201 DÖNER
        res.status(201).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail', 
            error
        })
    }
}