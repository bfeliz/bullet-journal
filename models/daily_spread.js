module.exports = function(sequelize, DataTypes) {
    const Daily = sequelize.define("Daily", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    Daily.associate = function(models) {
        Daily.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Daily;
};
