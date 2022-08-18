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

//Route for creating a post
router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
    }).then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to Update a post
router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }).then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "NoPost found matching this id" });
                return;
            }
            res.json(dbPostData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to upvote/like a post
router.put("/like", (req, res) => {
    Post.upvote(
        {...req.body, user_id: req.body.user_id },
        {Likes, Comments, Users }
    ).then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Route to delete a specific post by id
router.delete("/:id", (req, res) => {
    console.log("id", req.params.id);
    Post.destroy({
        where: {
            id: req.params.id,
        },
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found matching this id" });
            return;
        }
        res.json(dbPostData);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//exporting router file
module.exports= router;
