module.exports = function(sequelize, DataTypes) {
    var Journal = sequelize.define("Journal", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hab1Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab2Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab3Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab4Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab5Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab6Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab7Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hab8Name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Journal.associate = function(models) {
        // Journal.belongsTo(models.User, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
        // Journal.hasOne(models.bulletIndex, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
        // Journal.hasMany(models.Monthly, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    };
    return Journal;
};
