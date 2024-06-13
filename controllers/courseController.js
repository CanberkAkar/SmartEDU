const Course = require('../models/Course');

exports.createCourse = async (req,res)=>{
    const course= await Course.create(req.body);
    //YENİ ELEMANDA 201 DÖNER
    try {
        res.status(201).json({
            status:'success',
            course
        }) ;  
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error
        })
    }
    

}