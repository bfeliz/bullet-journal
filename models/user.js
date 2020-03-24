const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Monthly, {
            onDelete: "cascade"
        });
        User.hasMany(models.Pages, {
            onDelete: "cascade"
        });
        User.hasMany(models.Journal, {
            onDelete: "cascade"
        });
        User.hasMany(models.Posts, {
            onDelete: "cascade"
        });
        User.hasMany(models.Daily, {
            onDelete: "cascade"
        });
        User.hasMany(models.HabitTracker, {
            onDelete: "cascade"
        });
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};
