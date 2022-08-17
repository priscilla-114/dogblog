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

router.post("/", (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.session.post_id,
        }).then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    }).then((dbCommentData) => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment found matching this id" });
            return;
        }
        res.json(dbCommentData);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);  
    });
});

module.exports= router;



