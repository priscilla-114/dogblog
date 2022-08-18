const { Users } = require("../model");

const userdata = [
    {
        username: "Koolaidman",
        email: "juice@email.com",
        password: "password123"
    },
    {
        username: "C00per",
        email: "coopercups@email.com",
        password: "password123"
    },
    {
        username: "Lucki",
        email: "luckiday@email.com",
        password: "password123"
    },
    {
        username: "sparkles",
        email: "sparkles@email.com",
        password: "password123"
    },
    {
        username: "Sosa",
        email: "sosaman@email.com",
        password: "password123"
    },
    {
        username: "Rosie",
        email: "rosiedog@email.com",
        password: "password123"
    },
    {
        username: "King",
        email: "king@email.com",
        password: "password123"
    },
    {
        username: "Oreo",
        email: "oreo123@email.com",
        password: "password123"
    },
];

//seeding the data into the corresponding model
const seedUsers = () => Users.bulkCreate(userdata);
module.exports = seedUsers;