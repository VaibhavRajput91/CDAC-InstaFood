import api from '../api'

export async function getDeliveryStatsData() {
    try {
        const response = await api.get('/admin/statistics/delivery-partners')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
