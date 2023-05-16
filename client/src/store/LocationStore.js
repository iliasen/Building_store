import { makeAutoObservable } from "mobx";

export default class LocationStore {
    constructor() {
        this._location = "Минск";
        this._delivery = 50;
        makeAutoObservable(this);
        // Получение location из локального хранилища при создании экземпляра класса
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
            this._location = storedLocation;
        }
    }

    setLocation(location) {
        this._location = location;
        // Сохранение location в локальное хранилище при каждом изменении
        localStorage.setItem("location", location);
    }

    setDelivery(delivery) {
        this._delivery = delivery;
    }

    updateDelivery(delivery) {
        this._delivery += delivery;
    }

    get location() {
        return this._location;
    }

    get delivery(){
        return this._delivery
    }

    removeLocation() {
        localStorage.removeItem("location");
    }
}