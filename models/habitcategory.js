module.exports = function(sequelize, DataTypes) {
    var HabitCat = sequelize.define("HabitCat", {
        // The email cannot be null, and must be a proper email before creation
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        }
 
    });
    HabitCat.associate = function (models) {
    HabitCat.hasMany(models.HabitBox, {
        foreignKey: {
            allowNull: true
        }
    })
}

    return HabitCat;
};
