import axios from 'axios'
import { config } from '../config';

export async function getRestaurants(postalCode) {
  try {
    // create url
    let url = `${config.server}/restaurant/list-restaurants`
    if (postalCode) {
      url += `?postalCode=${postalCode}`
    }

    const response = await axios.get(url,{
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