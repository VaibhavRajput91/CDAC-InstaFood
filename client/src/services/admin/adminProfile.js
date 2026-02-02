import api from '../api'

export async function getAdminProfile() {
    try {
        const response = await api.get('/admin/profile')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
