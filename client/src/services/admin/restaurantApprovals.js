import axios from 'axios'
import { config } from '../config'

export async function getPendingRestaurants() {
    try {
        const url = `${config.server}/admin/approvals/restaurants`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return []
    }
}

export async function getRestaurantApplicationDetails(id) {
    try {
        const url = `${config.server}/admin/approvals/restaurants/${id}`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
