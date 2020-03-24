module.exports = function(sequelize, DataTypes) {
    const HabitBox = sequelize.define("HabitBox", {
        dayofmonth: {
            type: DataTypes.STRING,
            allowNull: false
        },

        value: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return HabitBox;
};
