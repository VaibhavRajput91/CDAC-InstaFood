import axios from 'axios'
import { config } from '../config';

export async function getRestaurantMenu(restaurantId) {
  try {
    // create url
    const url = `${config.server}/restaurant/menu/Dishes`

    // create headers with require token
    // send GET request and get the response
    // const response = await axios.get(url, {
    //   headers: {
    //     token: localStorage.getItem('token'),
    //   },
    // })
    const response = await axios.get(url,{
        params:{
            id:restaurantId,
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