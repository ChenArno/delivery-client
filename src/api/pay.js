
import fetch from '../utils/fetch'

export function pay(){
    return fetch({
        url:'/alipay/pay',
        method: 'get',
    })
}