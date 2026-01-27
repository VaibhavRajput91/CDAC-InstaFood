
import axios from 'axios'
import { config } from '../config'

export async function getTotalOrdersDetails() {
    try {
        const url = `${config.server}/admin/dashboard`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
