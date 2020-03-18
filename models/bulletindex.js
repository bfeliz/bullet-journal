module.exports = function (sequelize, DataTypes) {
    var bulletIndex = sequelize.define("bulletIndex", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })

    bulletIndex.associate = function (models) {
        bulletIndex.hasMany(models.Tasks, {
            foreignKey: {
                allowNull: false
            }
        });
        bulletIndex.hasMany(models.Daily, {
            foreignKey: {
                allowNull: false
            }
        });
        bulletIndex.hasMany(models.Monthly, {
            foreignKey: {
                allowNull: false
            }
        });
        bulletIndex.hasMany(models.Pages, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return bulletIndex;
}