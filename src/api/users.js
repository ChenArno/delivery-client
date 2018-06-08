import fetch from '../utils/fetch'

export function login(data) {
  return fetch({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return fetch({
    url: '/users/logout',
    method: 'post',
    data
  })
}