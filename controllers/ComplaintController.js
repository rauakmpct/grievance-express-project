const ComplaintModel = require('../models/Complaint')
class ComplaintController {
    static addcomplaint = async (req, res) => {
        try {
            const { name, email, role, image } = req.body
            res.render('complaint/addcomplaint', { n: name, role: role, img: image, msg: req.flash('message') })

        } catch (error) {
            console.log(error)
        }
    }

    static complaintinsert = async (req,res) => {
        try{
            const { name, email, role, image,id } = req.body
            console.log(req.body)
            console.log(req.files.image)
            const {ctype,semester,subject,cdetail}=req.body
        } catch(error){
            console.log(error)
        }
    }

}
module.exports = ComplaintController