class FrontController {

    static home = async (req, res) => {
        try {
            res.render('home', { msg: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            res.render("about")
        } catch (error) {
            console.log(error)
        }
    }

    static admin = async (req, res) => {
        try {
            res.render("admin")
        } catch (error) {
            console.log(error)
        }
    }

    static benefits = async (req, res) => {
        try {
            res.render("benefits")
        } catch (error) {
            console.log(error)
        }
    }

    static grs = async (req, res) => {
        try {
            res.render("grs")
        } catch (error) {
            console.log(error)
        }
    }

    static help = async (req, res) => {
        try {
            res.render("help")
        } catch (error) {
            console.log(error)
        }
    }
    static features = async (req, res) => {
        try {
            res.render("features")
        } catch (error) {
            console.log(error)
        }
    }
    static loginpage = async (req, res) => {
        try {
            res.render("login_page")
        } catch (error) {
            console.log(error)
        }
    }
    static student_login = async (req, res) => {
        try {
            res.render("student_login")
        } catch (error) {
            console.log(error)
        }
    }
    static dean_login = async (req, res) => {
        try {
            res.render("dean_login")
        } catch (error) {
            console.log(error)
        }
    }
    static admin = async (req, res) => {
        try {
            res.render("admin")
        } catch (error) {
            console.log(error)
        }
    }
    static student_login = async (req, res) => {
        try {
            res.render("student_login")
        } catch (error) {
            console.log(error)
        }
    }
    static dean_login = async (req, res) => {
        try {
            res.render("dean_login")
        } catch (error) {
            console.log(error)
        }
    }
    static admin = async (req, res) => {
        try {
            res.render("admin")
        } catch (error) {
            console.log(error)
        }
    }
    static register_page = async (req, res) => {
        try {
            res.render("register_page")
        } catch (error) {
            console.log(error)
        }
    }
    static register_page = async (req, res) => {
        try {
            res.render("register_page")
        } catch (error) {
            console.log(error)
        }
    }
    static register_page = async (req, res) => {
        try {
            res.render("register_page")
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = FrontController