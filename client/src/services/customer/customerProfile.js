import axios from 'axios'
import { config } from '../config';

export async function getCustomerProfile(userId) {
  try {
    // create url
    const url = `${config.server}/customer/profile`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url,{
        params:{
            userId
        },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}