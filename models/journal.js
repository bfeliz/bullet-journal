module.exports = function (sequelize, DataTypes) {
    var Journal = sequelize.define("Journal", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })

    Journal.associate = function (models) {
        Journal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Journal.hasOne(models.bulletIndex, {
            foreignKey: {
                allowNull: false
            }
        })
        Journal.hasMany(models.Monthly, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Journal;
}
