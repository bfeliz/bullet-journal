module.exports = function (sequelize, DataTypes) {
    var HabitBox = sequelize.define("HabitBox", {
        // The email cannot be null, and must be a proper email before creation
        dayofmonth: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        value: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
    HabitBox.associate = function (models) {
        HabitBox.belongsTo(models.HabitCat, {
            foreignKey: {
                allowNull: false
            }
        }) 
    }
    return HabitBox;
}