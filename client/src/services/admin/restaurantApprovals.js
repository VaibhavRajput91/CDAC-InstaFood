import api from '../api'

export async function getPendingRestaurants() {
    try {
        const response = await api.get('/admin/approvals/restaurants')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return []
    }
}

export async function getRestaurantApplicationDetails(id) {
    try {
        const response = await api.get(`/admin/approvals/restaurants/${id}`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
export async function approveRestaurant(id) {
    try {
        const response = await api.put(`/admin/approvals/restaurants/${id}/approve`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function rejectRestaurant(id) {
    try {
        const response = await api.put(`/admin/approvals/restaurants/${id}/reject`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
