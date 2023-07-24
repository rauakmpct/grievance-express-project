const express = require("express");
const FrontController = require("../controllers/FrontController");
// const TeacherController = require("../controllers/TeacherController");
const route = express.Router();

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

module.exports = route