module.exports = function(sequelize, DataTypes) {
    const HabitTracker = sequelize.define("HabitTracker", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    HabitTracker.associate = function(models) {
        HabitTracker.hasMany(models.HabitCat, {
            foreignKey: {
                allowNull: true
            }
        });
        HabitTracker.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return HabitTracker;
};
