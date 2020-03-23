module.exports = function(sequelize, DataTypes) {
    const Subcat = sequelize.define("Subcat", {
        subValue: {
            type: DataTypes.STRING
        },
        subName: {
            type: DataTypes.STRING
        }
    });
    return Subcat;
};
