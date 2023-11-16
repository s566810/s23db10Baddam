var express = require('express');
const school_controlers= require('../controllers/school');
var router = express.Router();
/* GET schools */
router.get('/', school_controlers.school_view_all_Page );
router.get("/detail", school_controlers.school_view_one_Page);
router.get("/create", school_controlers.school_create_Page);
router.get("/update", school_controlers.school_update_Page);
router.get("/delete", school_controlers.school_delete_Page);
module.exports = router;



