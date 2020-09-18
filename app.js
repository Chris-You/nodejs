var express = require('express');
var ejs = require('ejs');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});
app.listen(3000, function() {
    console.log("server is listening!!!");
});