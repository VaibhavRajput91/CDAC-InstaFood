import axios from 'axios'
import { config } from '../config'

export async function register(firstName, lastName, email, password, phone,role,city,postalCode,lineOne,lineTwo,state) {
  try {
    // url to send the request
    const url = `${config.server}/user/sign-up`

    // create a body object
    const body = { firstName, lastName, email, password, phone,role,city,postalCode,lineOne,lineTwo,state }

    // send POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}