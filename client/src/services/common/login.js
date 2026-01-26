import axios from "axios"
import { config } from "../config"

export async function login(email, password) {
  try {
    // create url
    const url = `${config.server}/user/sign-in`

    // create body
    const body = { email, password }

    // send the POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}