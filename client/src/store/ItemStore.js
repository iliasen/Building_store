import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor(){
        this._types= [
            {id:1, name:"Тачка"},
            {id:2, name:"Перфоратор"},
            {id:3, name:"Бензопила"},
            {id:4, name:"Шуруповерт"},
            {id:5, name:"Строительный пылесос"}
        ]
        this._brands = [
            {id:1, name:"Mile"},
            {id:2, name:"Worx"},
            {id:3, name:"Makita"},
            // {id:4, name:"Автомобиль"},
            // {id:5, name:"Автомобиль"}
        ]
        this._items = [
            {id:1,	name:"Тачка Eco-2",price:159,img:"091b53f0-cb23-4602-9b0b-c0b74fcdf223.jpg", typeID:1, brandId:1, rating: 0},
            {id:1,	name:"Worx WX337",price:277,img:"4cab4e5a-1d82-4532-b73e-404512f3b68b.jpg", typeID:2, brandId:2, rating: 0},
            {id:1,	name:"WORX WG385E.9",price:250,img:"ccde093e-b8bb-4491-9a53-1cd1bbcd5642.jpg", typeID:3, brandId:2, rating: 0},
            {id:1,	name:"Makita DF333DWYE",price:450,img:"67f10145-e3a8-49a2-abf6-b6bf6604b2c4.jpg", typeID:4, brandId:3, rating: 0},
            {id:1,	name:"Makita DCS460-45",price:572,img:"939d7a53-fefc-49de-99a3-7ee126c1b558.jpg", typeID:3, brandId:3, rating: 0}
        ]
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types=types
    }
    setBrands(brands){
        this._brands=brands
    }
    setItems(items){
        this._items=items
    }
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get items(){
        return this._items
    }
}