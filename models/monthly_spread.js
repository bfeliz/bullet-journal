module.exports = function (sequelize, DataTypes) {
    var Monthly = sequelize.define("Monthly", {
        // The email cannot be null, and must be a proper email before creation
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    Monthly.associate = function (models) {
        // Monthly.belongsTo(models.Journal, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
        Monthly.hasMany(models.Tasks, {
            foreignKey: {
                allowNull: false
            }
        }) 
        Monthly.hasMany(models.HabitTracker, {
            foreignKey: {
                allowNull: true
            }
        }) 
}
return Monthly;
}