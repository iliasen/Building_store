import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor(){
        this._flag = false;
        this._user = {};
        makeAutoObservable(this)
    }

    setAuth(bool){
        this._flag=true
    }
    setUser(user){
        this._user=user
    }

    get setAuth(){
        return this._flag
    }
    get user(){
        return this._user
    }
}