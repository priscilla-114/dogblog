const Users = require('./Users');
const Comments = require('./Comments');
const Likes = require('./Likes');
const Post = require('./Post');

//creating a one to many relationship with Users and post
Users.hasMany(Post, {
    foreignKey: 'user_id',
});
//creating one to one relationship with the post and User
Post.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});



