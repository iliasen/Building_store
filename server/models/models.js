const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    about: {type: DataTypes.STRING, defaultValue: null},
    img: {type: DataTypes.STRING, allowNull: false},
})


const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    feedback: {type: DataTypes.STRING, allowNull: false},
})

const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.belongsToMany(Item, { through: 'basket_item' })
Item.belongsToMany(Basket, { through: 'basket_item' })

sequelize.models.basket_item.belongsTo(Item)
sequelize.models.basket_item.belongsTo(Basket)

sequelize.models.basket_item.addHook('beforeSave', async (basket_item) => {
    basket_item.quantity = basket_item.quantity || 1;
});

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(ItemInfo, {as: 'info'});
ItemInfo.belongsTo(Item)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Basket,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo
}