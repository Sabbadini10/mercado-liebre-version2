const admin = ['ada', 'greta', 'vim', 'tim']

const admi = (req,res,next) => {
    if (admin.includes(req.query.user.toLowerCase())){
        next();
    } else {
        res.redirect("/loginAdmin?error=true")
    }
}

module.exports = admi;