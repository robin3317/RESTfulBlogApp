const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//MONGOOSE CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1501707305551-9b2adda5e527?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0cf5887247e17503ce4e542d00d86b9d&auto=format&fit=crop&w=500&q=60",
//   body: "This is test blog"
// });

//RESTFUL ROUTES
app.get("/", function (req, res) {
  res.redirect("/blogs");
})
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", {
        blogs: blogs
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running");
});