const express = require("express");
const app = express();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/hardcodeindex.html");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/newboard'));
app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});