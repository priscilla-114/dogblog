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