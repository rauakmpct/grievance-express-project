class TeacherController {

    static displayTeacher=async(req,res)=>{
        try{
            res.render(' Display Teacher')
        } catch(error){
            console.log(error)
        }
    }


}

module.exports = TeacherController