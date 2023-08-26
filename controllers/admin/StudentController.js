const { findById, findByIdAndUpdate } = require('../../models/Admin');
const StudentModel = require('../../models/Student')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class StudentController {
    static addstudent = async (req, res) => {
        try {
            const data = await StudentModel.find().sort({ _id: -1 })
            // console.log(data)
            const { name, email } = req.data1
            res.render('admin/student/addstudent', { d: data, n: name })

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
            const { name, email } = req.data1
            res.render('admin/student/view', { d: data, n: name })

        } catch (error) {
            console.log(error)
        }
    }

    static studentedit = async (req, res) => {
        try {
            // res.render(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            // console.log(data)
            const { name, email } = req.data1
            res.render('admin/student/edit', { d: data, n: name })

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

    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await StudentModel.findOne({ email: email })

                // password check
                if (user != null) {
                    const ismatched = await bcrypt.compare(password, user.password)
                    if (ismatched) {
                        if (user.role == 'admin') {
                            // Generate token
                            const token = jwt.sign({ ID: user._id }, 'rahul12345sign');
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        if (user.role == 'student') {
                            // Generate token
                            const token = jwt.sign({ ID: user._id }, 'rahul12345sign');
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }

                    } else {
                        res.redirect('/')
                    }

                } else {
                    res.redirect('/')
                }
            } else {
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    static changepassword = async (req, res) => {
        try {
            const { name, email } = req.data1
            res.render('admin/student/changepassword', {
                n: name, msg: req.flash('error'),
                msg1: req.flash('success')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static profile = async (req, res) => {
        try {
            const { name, email, phone, city, address } = req.data1
            res.render('admin/student/profile', { n: name, e: email, p: phone, c: city, a: address })
        } catch (error) {
            console.log(error)
        }
    }

    static updateprofile = async (req, res) => {
        try {
            const { name, email, id } = req.data1
            // console.log(req.body)
            const update = await StudentModel.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                city: req.body.city,
                address: req.body.address

            })
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    static updatepassword = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, id } = req.data1
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await StudentModel.findById(id)
                // console.log(user)

                // for password compareing
                const ismatched = await bcrypt.compare(oldpassword, user.password)
                if (!ismatched) {
                    req.flash('error', 'Old Password is Incorrect')
                    res.redirect('/changepassword')
                } else {
                    if (newpassword != cpassword) {
                        req.flash('error', 'Newpassword and confirmpassword does not match')
                        res.redirect('/changepassword')
                    } else {
                        const newhashpassword = await bcrypt.hash(newpassword, 10)
                        const r = await StudentModel.findByIdAndUpdate(id, {
                            password: newhashpassword,
                        })
                        req.flash('success', 'Password update sucessfully')
                        res.redirect('/changepassword')
                    }

                }

            } else {
                req.flash('error', 'All Field Are Required')
                res.redirect('/changepassword')
            }

        } catch (error) {
            console.log(error)
        }
    }




    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = StudentController;