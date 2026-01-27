import axios from 'axios'
import { config } from '../config';

export async function editProfile(userId, firstName, lastName, phone, city, postalCode, lineOne, lineTwo, state) {
  try {
    const url = `${config.server}/user/updateUser`
    const body = {
      firstName,
      lastName,
      phone,
      city,
      postalCode,
      lineOne,
      lineTwo,
      state
    }

    const response = await axios.put(url, body, {
        params: {
            userId
        },
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