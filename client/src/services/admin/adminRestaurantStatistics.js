
import axios from 'axios'
import { config } from '../config'

export async function getRestaurantStatsData() {
    try {
        const url = `${config.server}/admin/statistics/restaurants`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
