var path = require("path");
var fs = require("fs");
var express = require("express")

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

var notes = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
}
);

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
}
);

app.get("/api/notes", function(req,res) {
    res.json(notes);
}
);

app.listen(PORT, function() {
    console.log("Application is now listening on port" + PORT)
}
);