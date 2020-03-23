module.exports = function(sequelize, DataTypes) {
    const Monthly = sequelize.define("Monthly", {
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Monthly.associate = function(models) {
        Monthly.hasMany(models.Tasks, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Monthly;
};
