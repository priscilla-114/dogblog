//require the express package
const router = require("express").Router();

//Pull necessary files to be called later
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentsRoutes = require("./comments-routes");

//putting those called files into variable routes
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comments", commentsRoutes);

//exporting the routes in the file
module.exports = router;