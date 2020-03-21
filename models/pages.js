module.exports = function(sequelize, DataTypes) {
    var Pages = sequelize.define("Pages", {
        // The email cannot be null, and must be a proper email before creation
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

    //    Pages.associate = function (models) {
    //         Pages.belongsTo(models.bulletIndex, {
    //             foreignKey: {
    //                 allowNull: false
    //             }
    //         });
    //     }
    return Pages;
};
