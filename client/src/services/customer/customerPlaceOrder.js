import axios from 'axios'
import { config } from '../config';

export async function placeOrder(restaurantId, customerId, items, totalAmount) {
  try {
    const url = `${config.server}/customer/place-order`
    const body = {
      restaurantId,
      customerId,
      items,
      totalAmount
    }

    const response = await axios.post(url, body, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
    throw ex;
  }
}