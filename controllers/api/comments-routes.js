//install dependencies
const router = require("express").Router();
const { Comments, Users } = require("../../model");

router.get("/", (req, res) => {
    Comment.findAll({
        include: {
            model: Users,
            attributes: ["username"],
        },
    }).then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


