//import dependencies
const router = require('express').Router();

const { Users, Post, Comments, Likes } = require("../../model");

//Route to get ALL users
router.get("/", (req, res) => {
    Users.findAll({
        attributes: { exclude: ["password"] },
    }).then((UserInfo) => res.json(UserInfo))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Route to get a single Users profile
router.get("/:id", (req, res) => {
    Users.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id:req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content"],
            },
            {
                model: Comments,
                attributes: ["id", "comment_text", "post_id"],
            },
            {
                model: Likes,
                attributes: ["id"],
            },
        ]
    }).then((userInfo) => {
        if (!userInfo) {
            res.status(404).json({ message: "No user found matching this id" });
        }
        res.json(userInfo);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to allow user to create post
router.post("/", (req, res) => {
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((dbUserData) => {
        req.session.save(() => {
            req.sessions.user_id = dbUserData.id;
            req.sessions.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//User login
router.post("/login", (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({ message: "Email address not found" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect Password!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in" });
        });
    });
});

//Logout route
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//Delete User
router.delete("/:id", (req, res) => {
    Users.destroy({
        where: {
            id: req.params.id;
        },
    }).then((userInfo) => {
        if (!userInfo) {
            res.status(404).json({ message: "No user found matching this id" });
        }
        res.json(userInfo);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;