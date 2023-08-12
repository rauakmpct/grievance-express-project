const { findById, findByIdAndUpdate } = require('../../models/Admin');
const StudentModel = require('../../models/Student')
const bcrypt = require('bcrypt');

class StudentController {
    static addstudent = async (req, res) => {
        try {
            const data = await StudentModel.find().sort({ _id: -1 })
            // console.log(data)
            res.render('admin/student/addstudent', { d: data })

        } catch (error) {
            console.log(error)
        }
    }
    static studentinsert = async (req, res) => {
        try {
            // res.render(req.body)
            const { name, email, password } = req.body
            const hashpassword = await bcrypt.hash(password, 10)
            const result = new StudentModel({
                name: name,
                email: email,
                password: hashpassword
            })
            await result.save();
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }
    static studentview = async (req, res) => {
        try {
            // res.render(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/student/view', { d: data })

        } catch (error) {
            console.log(error)
        }
    }

    static studentedit = async (req, res) => {
        try {
            // res.render(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            console.log(data)
            res.render('admin/student/edit', { d: data })

        } catch (error) {
            console.log(error)
        }
    }

    static studentupdate = async (req, res) => {
        try {
            // console.log(req.body)
            const id = req.params.id
            const update = await StudentModel.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }

    static studentdelete = async (req, res) => {
        try {
            await StudentModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = StudentController;