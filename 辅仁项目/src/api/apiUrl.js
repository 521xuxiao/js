import { commonParams } from './host';
import axios from 'axios';


export function getData() {

  const url = commonParams.host + '/api/get/category.ashx'

  const data = Object.assign({}, {})

  return axios({
    method: 'get',
    url: url,
    headers: {
        // 'Content-type': 'application/x-www-form-urlencoded'
        'Accept': "application/json, text/plain, */*"
    },

    params: data
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
