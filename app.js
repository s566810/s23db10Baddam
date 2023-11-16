var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var schoolRouter = require("./routes/school");
var boardRouter = require("./routes/board");
var chooseRouter = require("./routes/choose");
var resourceRouter = require("./routes/resource");
var schoolModel = require("./models/school");

var app = express();

require("dotenv").config();
const connectionString = process.env.MONGO_CON;
mongoose = require("mongoose");
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/schools", schoolRouter);
app.use("/board", boardRouter);
app.use("/choose", chooseRouter);
app.use("/resource", resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await schoolModel.deleteMany();
  let instance1 = new schoolModel({
    school_name: "Northwest",
    school_location: "Missouri",
    school_courses: 12,
  });
  instance1
    .save()
    .then((doc) => {
      console.log("First object saved");
    })
    .catch((err) => {
      console.error(err);
    });
    let instance2 = new schoolModel({
      school_name: "Princeton",
      school_location: "Newyork",
      school_courses: 20,
    });
    instance2
      .save()
      .then((doc) => {
        console.log("second object saved");
      })
      .catch((err) => {
        console.error(err);
      });
      let instance3 = new schoolModel({
        school_name: "Stanford",
        school_location: "california",
        school_courses: 30,
      });
      instance3
        .save()
        .then((doc) => {
          console.log("third object saved");
        })
        .catch((err) => {
          console.error(err);
        });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;
