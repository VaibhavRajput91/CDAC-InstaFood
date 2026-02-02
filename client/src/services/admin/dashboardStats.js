import api from '../api'

export async function getTotalOrdersDetails() {
    try {
        const response = await api.get('/admin/dashboard')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
export async function getOrderStatusStats() {
    try {
        const response = await api.get('/admin/dashboard/order-status')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function getOrdersPerDayStats() {
    try {
        const response = await api.get('/admin/dashboard/orders-per-day')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function getTopSellingItemsStats() {
    try {
        const response = await api.get('/admin/dashboard/top-items')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}