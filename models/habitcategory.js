module.exports = function(sequelize, DataTypes) {
    const HabitCat = sequelize.define("HabitCat", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    HabitCat.associate = function(models) {
        HabitCat.hasMany(models.HabitBox, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return HabitCat;
};
