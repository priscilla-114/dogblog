//Pull all necessary files
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Make likes class and create schema for Likes
class Likes extends Model{}

//Blueprint for the Likes Table including all elements for likes
//Pulling User and Post Id to link with the likes table
Likes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Post",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Likes'
    }
);

//Exporting Likes file
module.exports = Likes;