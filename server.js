// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var isAuthenticated = require("./config/middleware/isAuthenticated");
var moment = require("moment");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Set Handlebars.

// const datesArray = [];
// for (let i = 1; i < moment().daysInMonth() + 1; i++) {
//     datesArray.push({ date: i });
// }
var exphbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphbs({
        // helpers: {
        //     daysOfMonth: function (context, options) {
        //       return percs

        //     }
        // },
        defaultLayout: "main"
    })
);

app.set("view engine", "handlebars");

app.get("/monthly/:id", isAuthenticated, function(req, res) {
    const datesArray = []
    db.Monthly.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Tasks]
    }).then(function(data) {
       
        data.Tasks.forEach(element => {
            datesArray.push(element.dataValues)    
        })
        
        res.render("monthly", {
            dates: moment,
            months: data.dataValues,
            datesParse: datesArray
        });
    });
});

app.get("/monthly", isAuthenticated, function(req, res) {
    res.render("monthly", {
        dates: datesArray
    });
});

app.get("/dailyspread/:id", isAuthenticated, function(req, res) {
    db.Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Subcat]
    }).then(function(data) {
        const subcatsArray = []
        
        data.Subcats.forEach(element => {
            subcatsArray.push(element.dataValues)    
        })
        console.log(data.dataValues.Subcats)
        res.render("bullet-notes", {
            postName: data.dataValues.name,
            subCat: subcatsArray
        });
    });
});

app.get("/habit/:id", isAuthenticated, function(req, res) {
    db.HabitTracker.findOne({
        where: {
            id: req.params.id
        },
        include: [db.HabitBox]
    }).then(function(data) {
        const habitBoxArray = []
        data.HabitBoxes.forEach(element => {
            habitBoxArray.push(element.dataValues)    
        })
        console.log(data)
        res.render("habits", {
            habit: data.dataValues.name,
            habitBox: habitBoxArray
        });
    });
});
console.log()
console.table()

app.get("/dailyspread", isAuthenticated, function(req, res) {
    res.render("bullet-notes");
});

app.get("/members", isAuthenticated, function(req, res) {
    res.render("home");
});

app.get("/habits", isAuthenticated, function(req, res) {
    res.render("habits");
});

app.get("/", function(req, res) {
    connection.query("SELECT * FROM daily_spread;", function(err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.render("bullet-notes", { daily_spread: data });
    });
});

// Create a new plan
app.post("/api/daily_spread", function(req, res) {
    connection.query(
        "INSERT INTO daily_spread (day) VALUES (?)",
        [req.body.day],
        function(err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new plan
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        }
    );
});

// Update a plan
app.put("/api/daily_spread/:id", function(req, res) {
    connection.query(
        "UPDATE daily_spread SET day = ? WHERE id = ?",
        [req.body.day, req.params.id],
        function(err, result) {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            } else if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Delete a plan
app.delete("/api/daily_spread/:id", function(req, res) {
    connection.query(
        "DELETE FROM daily_spread WHERE id = ?",
        [req.params.id],
        function(err, result) {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            } else if (result.affectedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
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
