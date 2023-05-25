import {$authHost} from './index'

export const addOrder = async (userId, itemId, quantity) => {
    const { data } = await $authHost.post('api/order/',{ userId,itemId, quantity})
    return data
}

export const getOrder = async ()=> {
    const { data } = await $authHost.get('api/order')
    return data
}

export const completeOrder = async (id)=>{
    const { data } = await $authHost.delete('api/order/'+id)
    return data
}