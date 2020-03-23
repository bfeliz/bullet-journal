const express = require("express");
const session = require("express-session");

const passport = require("./config/passport");
const isAuthenticated = require("./config/middleware/isAuthenticated");
const moment = require("moment");

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();

const morgan = require("morgan");

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// sessions to keep track of user status
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

const exphbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);

app.set("view engine", "handlebars");

// render monthly spread per id
app.get("/monthly/:id", isAuthenticated, function(req, res) {
    const datesArray = [];
    db.Monthly.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Tasks]
    }).then(function(data) {
        data.Tasks.forEach(element => {
            datesArray.push(element.dataValues);
        });
        res.render("monthly", {
            dates: moment,
            months: data.dataValues,
            datesParse: datesArray
        });
    });
});

// render collection spread
app.get("/dailyspread/:id", isAuthenticated, function(req, res) {
    db.Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Subcat]
    }).then(function(data) {
        const subcatsArray = [];

        data.Subcats.forEach(element => {
            subcatsArray.push(element.dataValues);
        });
        console.log(data.dataValues.Subcats);
        res.render("bullet-notes", {
            postName: data.dataValues.name,
            subCat: subcatsArray
        });
    });
});

// render chosen habit trackers
app.get("/habit/:id", isAuthenticated, function(req, res) {
    db.Journal.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.render("habits", {
            habit: data
        });
    });
});

// render main members page
app.get("/members", isAuthenticated, function(req, res) {
    res.render("home");
});

module.exports = moment;

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});
