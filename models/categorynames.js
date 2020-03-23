
module.exports = function (sequelize, DataTypes) {

var Subcat = sequelize.define("Subcat", {

   
    subValue: {
        type: DataTypes.STRING
    },
    subName: {
        type: DataTypes.STRING
    }
})
return Subcat;
}

// bulletIndex.associate = function (models) {
  
//     bulletIndex.hasMany(models.Monthly, {
//         foreignKey: {
        
//         }
//     });
//     bulletIndex.hasMany(models.Pages, {
//         foreignKey: {
//             allowNull: false
//         }
//     });
// }

