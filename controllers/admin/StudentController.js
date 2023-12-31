const { findById, findByIdAndUpdate } = require('../../models/Admin');
const StudentModel = require('../../models/Student')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dzqhnuroo',
    api_key: '434622187235975',
    api_secret: 'Q5hut4Hs9Xth4FtfghjpwG4T3Sw'
});

class StudentController {
    static addstudent = async (req, res) => {
        try {
            const data = await StudentModel.find().sort({ _id: -1 })
            // console.log(data)
            const { name, email, role, image,course } = req.data1
            res.render('admin/student/addstudent', { d: data, n: name, role: role,img:image,course:course, msg: req.flash('success'), msg1: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }
    static studentinsert = async (req, res) => {
        try {

            // console.log(req.files.image)
            // console.log(req.body)
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Profile Image'
            })
            // console.log(image_upload)
            const { name, email, password, image,course } = req.body
            const student = await StudentModel.findOne({ email: email })
            if (student) {
                req.flash('error', 'email already exists')
                res.redirect('/admin/addstudent')
            } else {
                if (name && email && password && course ) {
                    const hashpassword = await bcrypt.hash(password, 10)
                    const result = new StudentModel({
                        name: name,
                        email: email,
                        password: hashpassword,
                        course:course,
                        image: {
                            public_id: image_upload.public_id,
                            url: image_upload.secure_url,
                        }
                    })

                    await result.save();
                    req.flash('success', 'add student successfully')
                    res.redirect('/admin/addstudent')
                } else {
                    req.flash('error', 'all field are required')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static studentview = async (req, res) => {
        try {
            // res.render(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            // console.log(data)
            const { name, email, role, image } = req.data1
            res.render('admin/student/view', { d: data, n: name, role: role, img: image })

        } catch (error) {
            console.log(error)
        }
    }

    static studentedit = async (req, res) => {
        try {
            // res.render(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            // console.log(data)
            const { name, email, role, image } = req.data1
            res.render('admin/student/edit', { d: data, n: name, role: role, img: image, msg: req.flash('message') })

        } catch (error) {
            console.log(error)
        }
    }

    static studentupdate = async (req, res) => {
        try {
            const { name, email, password } = req.body
            const hashpassword = await bcrypt.hash(password, 10)
            // console.log(req.body)
            // console.log(req.files.image)
            if (req.files) {
                // image delete old image
                const student = await StudentModel.findById(req.params.id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                // image update
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Profile Image'
                })
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }


            } else {
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,

                }

            }
            const id = req.params.id
            await StudentModel.findByIdAndUpdate(id, data)
            req.flash('success', 'update successfully')
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }

    static studentdelete = async (req, res) => {
        try {
            const { name, email, role } = req.data1
            await StudentModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error)
        }
    }

    static verifylogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await StudentModel.findOne({ email: email })

                // password check
                if (user != null) {
                    // const ismatched = await bcrypt.compare(password, user.password)
                    const ismatched = true
                    // console.log(ismatched)
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
                        // generate token for login security


                    } else {
                        req.flash('error', 'email or passsword is incorrect')
                        res.redirect('/')
                    }

                } else {
                    req.flash('error', 'user not register user')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'email and password required')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    static changepassword = async (req, res) => {
        try {
            const { name, email, role,image } = req.data1
            res.render('admin/student/changepassword', {
                n: name, role: role,img:image, msg: req.flash('error'),
                msg1: req.flash('success')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static profile = async (req, res) => {
        try {
            const { name, email, phone, city, address, role, image,course } = req.data1
            res.render('admin/student/profile', { n: name, e: email, p: phone, c: city, a: address, role: role,img:image,co:course, msg: req.flash('message') })
        } catch (error) {
            console.log(error)
        }
    }
    static updateprofile = async (req, res) => {
        try {
            // console.log(req.files.image)
            const {name, email ,id}=req.data1
            if(req.files){
                const student = await StudentModel.findById(id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                // image upload code
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'profile Image'
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    adress: req.body.address,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }
                
            }else{
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    adress: req.body.address,
                }
            }
        
            // console.log(req.body)
            await StudentModel.findByIdAndUpdate(id,data)
            req.flash('success','update successfully')
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