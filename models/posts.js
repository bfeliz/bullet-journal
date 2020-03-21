module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        sub1Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sub2Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sub3Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sub4Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sub1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sub2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sub3: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sub4: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Posts;
};
