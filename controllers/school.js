var School = require('../models/school');
// List of all schools
exports.school_list = async function(req, res) {
    try{
        theschools = await School.find();
        res.send(theschools);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }        
};
// for a specific school.
exports.school_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await School.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// Handle school create on POST.
exports.school_create_post = async function(req, res) {
    let document = new School();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"school":"goat", "cost":12, "size":"large"}
    document.school_name = req.body.school_name;
    document.school_location = req.body.school_location;
    document.school_courses = req.body.school_courses;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// Handle school update form on PUT.
exports.school_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body
  ${JSON.stringify(req.body)}`)
  try {
  let toUpdate = await School.findById( req.params.id)
  // Do updates of properties
  if(req.body.school_name)
  toUpdate.school_name = req.body.school_name;
  if(req.body.school_location) toUpdate.school_location = req.body.school_location;
  if(req.body.school_courses) toUpdate.school_courses = req.body.school_courses;
  let result = await toUpdate.save();
  console.log("Sucess " + result)
  res.send(result)
  } catch (err) {
  res.status(500)
  res.send(`{"error": ${err}: Update for id ${req.params.id}
  failed`);
  }
  }


// Handle school delete on DELETE.
exports.school_delete = async function(req, res) {
console.log("delete " + req.params.id)
try {
result = await School.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};

// Handle a delete one view with id from query
exports.school_delete_Page = async function(req, res) {
console.log("Delete view for id " + req.query.id)
try{
result = await School.findById(req.query.id)
res.render('schoolDelete', { title: 'school Delete', toShow:
result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// VIEWS
// Handle a show all view
exports.school_view_all_Page = async function(req, res) {
    try{
    theschools = await School.find();
    res.render('Schools', { title: 'school Search Results', results: theschools });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // Handle a show one view with id specified by query
exports.school_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
      result = await School.findById(req.query.id);
      res.render("schoolDetail", {
        title: "School Details",
        toShow: result,
      });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  //create
  exports.school_create_Page = function (req, res) {
    console.log("create view");
    try {
      res.render("schoolCreate", { title: "school Create" });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  // Handle building the view for updating a school.
// query provides the id
exports.school_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id);
    try {
      let result = await School.findById(req.query.id);
      res.render("schoolUpdate", {
        title: "school Update",
        toShow: result,
      });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };