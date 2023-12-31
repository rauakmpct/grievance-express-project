const express = require("express");
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/admin/AdminController");
const StudentController = require("../controllers/admin/StudentController");
// const TeacherController = require("../controllers/TeacherController");
const route = express.Router();
const checkauth = require('../middlewear/auth');
const ComplaintController = require("../controllers/ComplaintController");
const CourseController = require('../controllers/admin/CourseController')

// routing
 
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/grs',FrontController.grs)
route.get('/admin',FrontController.admin)
route.get('/benefits',FrontController.benefits)
route.get('/help',FrontController.help)
route.get('/features',FrontController.features)
route.get('/loginpage',FrontController.loginpage)
route.get('/student_login',FrontController.student_login)
route.get('/dean_login',FrontController.dean_login)
route.get('/admin',FrontController.admin)
route.get('/student_login',FrontController.student_login)
route.get('/dean_login',FrontController.dean_login)
route.get('/admin',FrontController.admin)
route.get('/register_page',FrontController.register_page)
route.get('/register_page',FrontController.register_page)
route.get('/register_page',FrontController.register_page)


// Teacher Controller
// route.get('/teacher/display',TeacherController.displayTeacher)

// admin controller
route.get('/dashboard',checkauth,AdminController.dashboard)
route.get('/admin/login',AdminController.login)
route.get('/admin/register',AdminController.register)
route.post('/admininsert',AdminController.admininsert)
route.get('/displaycomplaint',checkauth,AdminController.displaycomplaint)
// route.post('/admin/verifylogin',AdminController.verifylogin)

// student controller
route.get('/admin/addstudent',checkauth,StudentController.addstudent)
route.post('/studentinsert',checkauth,StudentController.studentinsert)
route.get('/admin/studentview/:id',checkauth,StudentController.studentview)
route.get('/admin/studentedit/:id',checkauth,StudentController.studentedit)
route.post('/admin/studentupdate/:id',checkauth,StudentController.studentupdate)
route.get('/admin/studentdelete/:id',checkauth,StudentController.studentdelete)
route.post('/verifylogin',StudentController.verifylogin)
route.get('/logout',StudentController.logout)
route.get('/changepassword',checkauth,StudentController.changepassword)
route.get('/profile',checkauth,StudentController.profile)
route.post('/updateprofile',checkauth,StudentController.updateprofile)
route.post('/updatepassword',checkauth,StudentController.updatepassword)



// ComplaintController
route.get('/addcomplaint',checkauth,ComplaintController.addcomplaint)
route.post('/complaintinsert',checkauth,ComplaintController.complaintinsert)
route.get('/complaint/complaintview/:id',checkauth,ComplaintController.viewcomplaint)
route.get('/complaint/complaintedit/:id',checkauth,ComplaintController.editcomplaint)
route.post('/complaint/complaintupdate/:id',checkauth,ComplaintController.updatecomplaint)
route.get('/complaint/complaintdelete/:id',checkauth,ComplaintController.complaintdelete)
route.post('/updatestatus/:id',checkauth,ComplaintController.updatestatus)

//course controller
route.get('/addcourse',checkauth,CourseController.addcourse)
route.post('/courseinsert',checkauth,CourseController.courseinsert)
route.get('/admin/courseview/:id',checkauth,CourseController.courseview)
route.get('/admin/courseedit/:id',checkauth,CourseController.courseedit)
route.post('/admin/courseupdate/:id',checkauth,CourseController.courseupdate)
route.get('/admin/coursedelete/:id',checkauth,CourseController.coursedelete)


module.exports = route;