import fetch from '../utils/fetch'

export function addSysMumuGoods(data) {
  return fetch({url: `/sysMumu/addSysMumuGoods`, data, method: 'post'})
}

export function updateSysMumuGoods(data) {
  return fetch({url: `/sysMumu/updateSysMumuGoods`, data, method: 'post'})
}
export function getSysMumuGoods(orgId,pageNumber,pageSize) {
  return fetch({url: `/sysMumu/getSysMumuGoods?orgId=${orgId}&pageSize=${pageSize}&pageNumber=${pageNumber}`, method: 'get'})
}
export function baseUrl(){
  return process.env.BASE_API+"/sysMumu/uploadSysMumuGoods"
}
export function deleteSysMumuGoods(data) {
  return fetch({url: `/sysMumu/deleteSysMumuGoods`, data, method: 'post'})
}
export function getImageShow(orgId) {
  return fetch({url: `/sysMumu/getImageShow?orgId=${orgId}`, method: 'get'})
}