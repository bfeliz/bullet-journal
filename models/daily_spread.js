module.exports = function (sequelize, DataTypes) {
    var Daily = sequelize.define("Daily", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })
    Daily.associate = function (models) {
        Daily.belongsTo(models.Monthly, {
            foreignKey: {
                allowNull: false
            }
        })
        Daily.hasMany(models.Tasks, {
            foreignKey: {
                allowNull: false
            }
        }) 
}
    return Daily;
}