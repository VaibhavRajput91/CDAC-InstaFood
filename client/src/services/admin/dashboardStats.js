
import axios from 'axios'
import { config } from '../config'

export async function getTotalOrdersDetails() {
    try {
        const url = `${config.server}/admin/dashboard`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}
export async function getOrderStatusStats() {
    try {
        const url = `${config.server}/admin/dashboard/order-status`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function getOrdersPerDayStats() {
    try {
        const url = `${config.server}/admin/dashboard/orders-per-day`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}

export async function getTopSellingItemsStats() {
    try {
        const url = `${config.server}/admin/dashboard/top-items`
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
        return null
    }
}