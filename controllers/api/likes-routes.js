//install dependencies
/* likes will require sessions for login, front end is not set up yet
const router = require("express").Router();
const { Likes, Users } = require("../../model");

//get request to find all comments
router.get("/", (req, res) => {
    Likes.findAll({
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
        Likes.create({
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
    Likes.destroy({
        where: {
            id: req.params.id,
        },
    }).then((dbCommentData) => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No like found matching this id" });
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
*/