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
}

module.exports = AdminController;