import axios from 'axios'
import { config } from '../config'

export async function getPendingDeliveryPartners() {
    try {
        const url = `${config.server}/admin/approvals/delivery-partners/applications`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return []
    }
}

export async function getDeliveryPartnerApplicationDetails(id) {
    try {
        const url = `${config.server}/admin/approvals/delivery-partners/applications/${id}`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
export async function approveDeliveryPartner(id) {
    try {
        const url = `${config.server}/admin/approvals/delivery-partners/${id}/approve`
        const response = await axios.put(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function rejectDeliveryPartner(id) {
    try {
        const url = `${config.server}/admin/approvals/delivery-partners/${id}/reject`
        const response = await axios.put(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
