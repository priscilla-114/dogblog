//install dependencies
const router = require("express").Router();
const { Comments, Users } = require("../../model");

//get request to find all comments
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

//post route to create a comment
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

//route used to delete a comment
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

//exporting the file
module.exports= router;



