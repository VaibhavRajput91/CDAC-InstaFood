
import axios from 'axios'
import { config } from '../config'

export async function getCustomerStatsData() {
    try {
        const url = `${config.server}/admin/statistics/customers`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
