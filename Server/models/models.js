const sequelize = require("../db")
const {dataTypes, DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true},
})

const Basket_items = sequelize.define('basket_items',{
    id: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true},
})

const items = sequelize.define('items',{
    id: {type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true},

    name: {type:DataTypes.STRING,
        unique: true,
        allowNull: false},

    price:{type: DataTypes.INTEGER,
    allowNull: false},

    rating: {type: DataTypes.STRING,
    defaultValue: 0},

    image: {type: DataTypes.STRING,
    allowNull: false}
})

const items_info = sequelize.define('items_info', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},

    title: {type: DataTypes.STRING,
        allowNull: false
    },

    discription: {type: DataTypes.STRING,
    allowNull: false}
 })

const Type = sequelize.define('Type',{
    id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},

    name: {type: DataTypes.STRING,
    allowNull: false,
    unique: true}
})

const Brand = sequelize.define('Brand',{
    id: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},

    name: {type: DataTypes.STRING,
        allowNull: false,
        unique: true}
})

const rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},

    rate: {type: DataTypes.STRING,
        allowNull: false,}

})

const TypeBrand = sequelize.define('Type_Brand',{ //перефирийная таблица(связующая связь многие ко многим)
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(Basket_items)
Basket_items.belongsTo(Basket)

User.hasMany(rating)
rating.belongsTo(User)

items.hasMany(rating)
rating.belongsTo(items)

items.hasMany(items_info)
items_info.belongsTo(items)

Type.hasOne(items)
items.belongsTo(Type)

Brand.hasOne(items)
items.belongsTo(Brand)

items.hasMany(Basket_items)
Basket_items.belongsTo(items)

items.hasMany(items_info)
items_info.belongsTo(items)

Type.belongsToMany(Brand, {through: TypeBrand})//многие ко многим
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    Basket_items,
    items,
    items_info,
    Type,
    Brand,
    rating,
    TypeBrand
}