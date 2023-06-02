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
    username: {type: DataTypes.STRING,allowNull: false},
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

const OrderItem = sequelize.define('order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, references: {model: Order, key: 'id'}},
    itemId: { type: DataTypes.INTEGER, references: {model: Item, key: 'id'}},
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
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

User.hasMany(Order,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
Order.belongsTo(User)

Basket.hasMany(BasketItem,{foreignKeyConstraint: true, onDelete: 'CASCADE',foreignKey: 'basketId', as: 'basketItems'})
BasketItem.belongsTo(Basket)

// Basket.hasMany(Order,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
// Order.belongsTo(Basket)

Order.hasMany(OrderItem,{foreignKeyConstraint: true, onDelete: 'CASCADE', foreignKey: 'orderId', as: 'orderItems'})
OrderItem.belongsTo(Order,{foreignKey: 'orderId', as: 'order'})

Item.hasMany(BasketItem,{foreignKeyConstraint: true, onDelete: 'CASCADE'})
BasketItem.belongsTo(Item)

Item.hasMany(OrderItem,{foreignKeyConstraint: true, onDelete: 'CASCADE',foreignKey: 'itemId', as: 'orderItems'})
OrderItem.belongsTo(Item,{foreignKey: 'itemId', as: 'item'})

Basket.belongsToMany(Item, { through: BasketItem })
Item.belongsToMany(Basket, { through: BasketItem })

Order.belongsToMany(Item, { through: OrderItem })
Item.belongsToMany(Order, { through: OrderItem })

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
    OrderItem,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo
}