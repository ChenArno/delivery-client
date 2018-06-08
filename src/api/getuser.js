
import fetch from '../utils/fetch'

export function getuser(){
    return fetch({
        url:'/users/getUser',
        method: 'get',
    })
}
export function queryGoods(pageNumber,pageSize){
    return fetch({
        url:`/taobao/queryGoods?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        method: 'get',
    })
}
