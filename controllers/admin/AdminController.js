const AdminModel = require('../../models/Admin')
const bcrypt = require('bcrypt');
class AdminController {
    static dashboard = async (req, res) => {
        try {
            res.render('admin/dashboard')
        } catch (error) {
            console.log(error)

        }
    }

    static login = async (req, res) => {
        try {
            res.render('admin/login')
        } catch (error) {
            console.log(error)
        }
    }
    static register = async (req, res) => {
        try {
            res.render('admin/register')
        } catch (error) {
            console.log(error)
        }
    }
    static admininsert = async(req,res)=>{
        try {
            // console.log(req.body)
            const {name,email,password}=req.body
            const hashpassword = await bcrypt.hash(password,10)
            const result = new AdminModel({
                name:name,
                email:email,
                password:hashpassword
            })
            await result.save();
            res.redirect('/admin/login')
     
        } catch (error) {
            console.log(error)
            
        }
    }

    static verifylogin = async (req,res) =>{
        try{
            const {email,password}=req.body
          if (email && password) {
            const admin=await AdminModel.findOne({email:email})

            // password check
           if(admin !=null){
            const ismatched = await bcrypt.compare(password,admin.password)
            if (ismatched) {
                res.redirect('/admin/dashboard')
                
            } else {
                res.redirect('/admin/login')
                
            }

           }else{
            req.redirect('/admin/login')
           }
            
          } else {
            res.redirect('/admin/login')     
          }

        }catch(error){
            console.log(error)
        }
    }
    
}

module.exports = AdminController;