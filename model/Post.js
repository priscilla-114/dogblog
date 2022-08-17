//Grab all necessary connecting files
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Make Post class and Create Schema of Post Table
class Post extends Model {}

//Bluepring for Post table including all elements of the post.
//Pulling User_id to link Post table to user table
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [7]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'
    }
);

//Exporting Post file
module.exports = Post;