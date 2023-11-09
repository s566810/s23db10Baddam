const mongoose = require("mongoose")
const schoolSchema = mongoose.Schema({
school_name: String,
school_location: String,
school_courses: Number
});
module.exports = mongoose.model("School", schoolSchema)