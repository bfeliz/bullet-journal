module.exports = function(sequelize, DataTypes) {
    const Pages = sequelize.define("Pages", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Pages.associate = function(models) {
        Pages.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Pages;
};
