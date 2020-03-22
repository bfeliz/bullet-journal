module.exports = function (sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        // The email cannot be null, and must be a proper email before creation
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        value: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    Tasks.associate = function (models) {
        Tasks.belongsTo(models.Monthly, {
            foreignKey: {
                allowNull: false
            }
        }) 
    }
    return Tasks;
}