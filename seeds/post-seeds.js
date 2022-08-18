const { Post } = require('../model');

//Hardcoded Post data
const postdata = [
    {
        title: "New food",
        content: "My buddy gave me some new food to try today. It was good!",
        user_id: 2,
    },
    {
        title: "Walk",
        content: "Boy I never get tired of going on walks",
        user_id: 1,
    },
    {
        title: "Sleep Schedule",
        content: "My mom wakes up early so I cant sleep late anymore",
        user_id: 5,
    },
    {
        title: "Friends",
        content: "I made a new friend today at the park!",
        user_id: 4,
    },
    {
        title: "The new park",
        content: "We went to a new park today, it was awesome!",
        user_id: 3,
    },
    {
        title: "Water",
        content: "I dont think i get enough water throughout the day",
        user_id: 6,
    },
    {
        title: "Running",
        content: "I think ill go for a run today. Ive been very lazy lately",
        user_id: 7,
    },
];

//Seeding the data into the corresponding model
const seedPosts = () => Post.bulkCreate(postdata);
module.exports = seedPosts;