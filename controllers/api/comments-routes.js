//install dependencies
const router = require("express").Router();
const { Comments, Users } = require("../../model");
const withAuth = require('../../utilities/auth');

//get request to find all comments
router.get("/", (req, res) => {
    Comments.findAll({
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


//Finding One specific post
router.get("/:id", (req, res) => {
    Comments.findOne({
        where: { id: req.params.id },
        attributes: ["id", "comment_text", "user_id", "post_id"],
       
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found matching this id" });
            return;
        }
        res.json(dbPostData)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post route to create a comment
router.post("/", (req, res) => {
    if (req.session) {
        Comments.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        }).then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

//route used to delete a comment
router.delete("/:id", (req, res) => {
    Comments.destroy({
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
module.exports = router;



