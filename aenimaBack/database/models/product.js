module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols =  {
        id_product: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        deleted: {
            type: DataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
        }
    const Product = sequelize.define(alias, cols, config);
    Product.associate = function(models){
        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: "id_product"
        });
    } 
    return Product;
}