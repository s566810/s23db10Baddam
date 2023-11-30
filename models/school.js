const mongoose = require("mongoose")
const schoolSchema = mongoose.Schema({
school_name: {
    type: String,
    required: true
},
school_location: {
    type: String,
    required: true
},
school_courses: {
    type: Number,
    min: 0,
    max: 4000
}
});
module.exports = mongoose.model("School", schoolSchema)