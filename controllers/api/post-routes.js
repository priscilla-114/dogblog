//grab required dependencies
const router = require("express").Router();
const { Post, Likes, Users, Comments } = require("../../model");

//route to find ALL posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "content", "title"],
        include: [
            {
                model: Comments,
                attributes: ["id", "comment_text", "post_id", "user_id"],
                include: {
                    model: Users,
                    attributes: ["username"],
                },
            },
            {
                model: Users,
                attributes: ["username"],
            },
        ],
    }).then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Finding One specific post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ["id", "title", "content", "user_id"],
        include: [
            {
                model: Comments,
                attributes: ["id", "comment_text", "post_id", "user_id"],
                include: {
                    model: Users,
                    attributes: ["username"],
                },
            },
        ],
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

