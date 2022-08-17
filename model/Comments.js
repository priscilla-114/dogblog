//Grab all necessary connecting files
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

//Make Comment class and Create Schema for Comments
class Comments extends Model {}

//Blueprint for the Comments table including all elements for comments
//Pulling User and Post id to link with the Comments Table
Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Post",
                key: "id"
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "Comments",
    }
);

//exporting the file
module.exports= Comments;