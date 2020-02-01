var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/reachout", { useNewUrlParser: true });

exports.User = require("./UserSchema");
