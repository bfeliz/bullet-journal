module.exports = function (sequelize, DataTypes) {
    var Pages = sequelize.define("Pages", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })

//    Pages.associate = function (models) {
//         Pages.belongsTo(models.bulletIndex, {
//             foreignKey: {
//                 allowNull: false
//             }
//         });
//     }
    return Pages;
}