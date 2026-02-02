import api from '../api'

export async function getCustomerStatsData() {
    try {
        const response = await api.get('/admin/statistics/customers')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
