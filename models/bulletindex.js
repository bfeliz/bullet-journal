module.exports = function(sequelize, DataTypes) {
    const bulletIndex = sequelize.define("bulletIndex", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true
        }
    });

    return bulletIndex;
};
