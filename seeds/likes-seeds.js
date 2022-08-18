const { Likes } = require('../model');

//Hardcoded like data
const likesdata = [
    {
        user_id: 1,
        post_id: 1,
    },
    {
        user_id: 1,
        post_id: 2,
    },
    {
        user_id: 2,
        post_id: 5,
    },
    {
        user_id: 2,
        post_id: 4,
    }
];

//seeding the data into the corresponding model
const seedUserlikes = () => Likes.bulkCreate(likesdata);
module.exports = seedUserlikes;