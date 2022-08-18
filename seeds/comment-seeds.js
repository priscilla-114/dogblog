const { Comments } = require('../model');

//Hardcoded comment data
const commentdata = [
    {
        comment_text: "Bark Bark",
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: "Barking",
        user_id: 2,
        post_id: 4,
    },
    {
        comment_text: "Woof Woof",
        user_id: 3,
        post_id: 1,
    },
    {
        comment_text: "Howling",
        user_id: 5,
        post_id: 2,
    },
    {
        comment_text: "Growling",
        user_id: 3,
        post_id: 5,
    },
    {
        comment_text: "Woofing",
        user_id: 7,
        post_id: 3,
    },
    {
        comment_text: "Wagstail",
        user_id: 6,
        post_id: 3,
    },
];

//Seeding the data into the corresponding model
const seedComments = () => Comments.bulkCreate(commentdata);
module.exports = seedComments;