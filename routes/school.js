var express = require('express');
const school_controlers= require('../controllers/school');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/* GET schools */
router.get('/', school_controlers.school_view_all_Page );
router.get("/detail",secured, school_controlers.school_view_one_Page);
router.get("/create",secured, school_controlers.school_create_Page);
router.get("/update",secured, school_controlers.school_update_Page);
router.get("/delete",secured, school_controlers.school_delete_Page);
module.exports = router;

    



