import fetch from '../utils/fetch'

export function getBusinessLists(accountId) {
  return fetch({url: `/hdclub/getBusinessLists?accountId=${accountId}`, method: 'get'})
}
