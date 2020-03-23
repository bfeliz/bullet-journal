const path = require("path");

// routes for the login and signin pages
module.exports = function(app) {
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signin", function(req, res) {
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
};
