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



