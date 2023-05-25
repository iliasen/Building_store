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
const BasketItem = sequelize.define('basket_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user: {type: DataTypes.STRING, unique: true},
    address: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING, defaultValue: null}
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


User.hasOne(Basket,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Basket.belongsTo(User)

User.hasMany(Rating,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Rating.belongsTo(User)

Basket.hasMany(BasketItem,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
BasketItem.belongsTo(Basket)

Basket.hasMany(Order,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Order.belongsTo(Basket)

Item.hasMany(BasketItem,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
BasketItem.belongsTo(Item)

Basket.belongsToMany(Item, { through: BasketItem })
Item.belongsToMany(Basket, { through: BasketItem })

Type.hasMany(Item,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Item.belongsTo(Type)

Brand.hasMany(Item,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Item.belongsTo(Brand)

Item.hasMany(Rating,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Rating.belongsTo(Item)

Item.hasMany(ItemInfo, {as: 'info', foreignKeyConstraint: true, onDelete: 'CASCADE'});
ItemInfo.belongsTo(Item)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Basket,
    BasketItem,
    Order,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo
}