const db = require("../models");
const passport = require("../config/passport");
const moment = require("moment");

module.exports = function(app) {
    // authenticate user
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    // signup user
    app.post("/api/signup", function(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function() {
                res.redirect(307, "/api/login");
            })
            .catch(function(err) {
                res.status(401).json(err);
            });
    });

    // log user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // get user data
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    // post new dailies
    app.post("/api/newdaily", function(req, res) {
        db.Daily.create({
            name: req.body.name,
            UserId: req.user.id
        }).then(function(data) {
            res.json(data);
        });
    });

    // get dailies
    app.get("/api/alldailies", function(req, res) {
        db.Daily.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    // get main page links to collections/monthlies
    app.get("/api/pages", function(req, res) {
        db.Pages.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    // modify tasks
    app.put("/api/modifydaily/:id", function(req, res) {
        db.Daily.update(
            {
                completed: 1
            },
            {
                where: { id: req.params.id }
            }
        ).then(function(data) {
            res.json(data);
        });
    });

    // save tasks
    app.put("/api/saveTask/:id/:val", function(req, res) {
        db.Tasks.update(
            {
                value: req.params.val
            },
            {
                where: { id: req.params.id }
            }
        )
            .then(function(data) {
                res.json(data);
            })
            .catch(err => console.log(err));
    });

    // save collection items
    app.put("/api/saveCollectionItem/:id/:val", function(req, res) {
        db.Subcat.update(
            {
                subValue: req.params.val
            },
            { where: { id: req.params.id } }
        )
            .then(function(data) {
                res.json(data);
            })
            .catch(err => console.log(err));
    });

    // create chosen monthly spread
    app.post("/api/newmonthly/:chosen", async function(req, res) {
        try {
            await monthlyCreate();
            res.render("monthly");
        } catch (err) {
            console.log(err);
        }

        async function monthlyCreate() {
            db.Monthly.create({
                month: req.params.chosen,
                year: moment().get("year"),
                UserId: req.user.id
            }).then(function(answers) {
                db.Pages.create({
                    name: answers.dataValues.month + " " + "Monthly Spread",
                    type: "monthly",
                    typeId: answers.dataValues.id,
                    UserId: req.user.id
                });
                const daysInChosenMonth = moment()
                    .month(req.params.chosen)
                    .format("M");
                const daysInMonth = moment(
                    `2020-${daysInChosenMonth}`,
                    "YYYY-MM"
                ).daysInMonth();
                for (let i = 1; i < daysInMonth + 1; i++) {
                    db.Tasks.create({
                        date: i,
                        MonthlyId: answers.dataValues.id
                    }).catch(err => console.log(err));
                }
            });
        }
    });

    // create chosen collection
    app.post("/api/newcollection/:collect", async function(req, res) {
        try {
            let test = req.params.collect;
            let finalArray = test.split(",");
            const postName = await postCreate(finalArray);
            const floop = await findDataz(postName);
            await pageCreatez(floop);
            await createRest(floop, finalArray);
            res.render("bullet-notes");
        } catch (err) {
            console.log(err);
        }

        async function postCreate(data) {
            try {
                await db.Posts.create({
                    name: data[0],
                    UserId: req.user.id
                });
                return data[0];
            } catch (err) {
                console.log(err);
            }
        }
        async function pageCreatez(data) {
            try {
                const gerb2 = db.Pages.create({
                    name: data.dataValues.name + " " + "Collection",
                    type: "dailyspread",
                    typeId: data.dataValues.id,
                    UserId: req.user.id
                });
                return gerb2;
            } catch (err) {
                console.log(err);
            }
        }
        async function findDataz(a) {
            try {
                const gerb3 = db.Posts.findOne({
                    where: {
                        name: a
                    }
                });
                return gerb3;
            } catch (err) {
                console.log(err);
            }
        }

        function createRest(data, array) {
            for (let i = 1; i < array.length; i++) {
                db.Subcat.create({
                    PostId: data.dataValues.id,
                    subName: array[i]
                });
            }
        }
    });

    // create new habit
    app.post("/api/newhabit/:habit", async function(req, res) {
        try {
            let hab = req.params.habit;
            let habArray = hab.split(",");
            await habCreate(habArray);
        } catch (err) {
            console.log(err);
        }

        function habCreate(data) {
            db.Journal.create({
                name: data[0],
                hab1Name: data[1],
                hab2Name: data[2],
                hab3Name: data[3],
                hab4Name: data[4],
                hab5Name: data[5],
                hab6Name: data[6],
                hab7Name: data[7],
                hab8Name: data[8],
                hab9Name: data[9]
            })
                .then(function(answers) {
                    db.Pages.create({
                        name: answers.dataValues.name + " " + "Habit Tracker",
                        type: "habit",
                        typeId: answers.dataValues.id,
                        UserId: req.user.id
                    });
                    res.json(answers);
                })
                .catch(err => console.log(err));
        }
    });
};
