import api from '../api'

export async function getPendingDeliveryPartners() {
    try {
        const response = await api.get('/admin/approvals/delivery-partners/applications')
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return []
    }
}

export async function getDeliveryPartnerApplicationDetails(id) {
    try {
        const response = await api.get(`/admin/approvals/delivery-partners/applications/${id}`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
export async function approveDeliveryPartner(id) {
    try {
        const response = await api.put(`/admin/approvals/delivery-partners/${id}/approve`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function rejectDeliveryPartner(id) {
    try {
        const response = await api.put(`/admin/approvals/delivery-partners/${id}/reject`)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
