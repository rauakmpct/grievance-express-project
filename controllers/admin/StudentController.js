class StudentController {
    static addstudent = async (req,res)=> {
        try{
            res.render('admin/student/addstudent')
        } catch(error){
            console.log(error)
        }
    }
}
module.exports=StudentController;