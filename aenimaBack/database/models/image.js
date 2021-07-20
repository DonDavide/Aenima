module.exports = (sequelize, DataTypes) => {
    let alias = 'Image';
    let cols =  {
        id_image: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
            id_product: {
                type: DataTypes.INTEGER,
            },       
            name: {
                type: DataTypes.STRING,
            },
            path: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE
            },
            deleted: {
                type: DataTypes.INTEGER,
            }
    };
    let config = {
        tableName: 'images',
        timestamps: false
    }
    const Image = sequelize.define(alias, cols, config);
    Image.associate = function(models){
        Image.belongsTo(models.Product, {
            as: "products",
            foreignKey: "id_image"
        });  
    } 
    return Image;
}