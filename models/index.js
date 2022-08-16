const Users = require('./Users');
const Comments = require('./Comments');
const Likes = require('./Likes');
const Post = require('./Post');

//PRIMARY USER RELATIONSHIPS 
//creating a one to many relationship with Users and post
Users.hasMany(Post, {
    foreignKey: 'user_id',
});
//creating one to one relationship with the post and User
Post.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});
//creating one to many relationship with users and comments
Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});
//creating a one to one relationship with the comments and users
Comments.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});
//creating one to many relationship with Users and likes
Users.hasMany(Likes, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});
//creating a one to one relationship with likes and users
Likes.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

//C
Post.hasMany(Likes, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
});

Likes.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
});
