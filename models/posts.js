module.exports = function(sequelize, DataTypes) {
    const Posts = sequelize.define("Posts", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    Posts.associate = function(models) {
        Posts.hasMany(models.Subcat, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Posts;
};
