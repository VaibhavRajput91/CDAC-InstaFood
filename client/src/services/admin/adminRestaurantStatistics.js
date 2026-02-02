import api from '../api'

export async function getRestaurantStatsData() {
    try {
        const response = await api.get('/admin/statistics/restaurants')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
