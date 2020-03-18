module.exports = function (sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })
    return Posts;
}