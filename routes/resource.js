var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var school_controller = require('../controllers/school');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
router.get("/School/:id", school_controller.school_detail);
router.put("/school/:id", school_controller.school_update_put);
/// SCHOOL ROUTES ///
// POST request for creating a school.
router.post('/school', school_controller.school_create_post);
// DELETE request to delete school.
router.delete('/schools/:id', school_controller.school_delete);
// PUT request to update school.
     router.put('/school/:id', school_controller.school_update_put);
// GET request for one school.
      router.get('/school/:id', school_controller.school_detail);
// GET request for list of all school items.
router.get('/schools', school_controller.school_list);
module.exports = router;

