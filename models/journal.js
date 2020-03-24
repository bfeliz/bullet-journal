module.exports = function(sequelize, DataTypes) {
    const Journal = sequelize.define("Journal", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true
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

    return Journal;
};
