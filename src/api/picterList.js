import fetch from '../utils/fetch'

export function getAllPicte(pageSize,pageNumber){
    return fetch({
        url:`/fileManager/getAllPicte?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        method: 'get',
    })
}

export function baseUrl(){
    return process.env.BASE_API
}