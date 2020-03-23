module.exports = function(sequelize, DataTypes) {
    const Tasks = sequelize.define("Tasks", {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Tasks.associate = function(models) {
        Tasks.belongsTo(models.Monthly, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Tasks;
};
