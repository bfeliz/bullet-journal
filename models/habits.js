module.exports = function(sequelize, DataTypes) {
    var HabitTracker = sequelize.define("HabitTracker", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
 
    });
    HabitTracker.associate = function (models) {
    HabitTracker.hasMany(models.HabitCat, {
        foreignKey: {
            allowNull: true
        }
    })
}

    return HabitTracker;
};
