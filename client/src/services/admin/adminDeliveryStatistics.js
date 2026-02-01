import axios from 'axios'
import { config } from '../config'

export async function getDeliveryStatsData() {
    try {
        const url = `${config.server}/admin/statistics/delivery-partners`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
