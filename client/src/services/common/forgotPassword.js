import axios from "axios"
import { config } from "../config"

export async function forgotPassword(email, currentPassword, newPassword) {
  try {
    // create url
    const url = `${config.server}/user/updatePassword`

    // create body
    const body = { email, currentPassword, newPassword }

    // send the POST request
    const response = await axios.put(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}