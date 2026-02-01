import { createContext, useState, useContext, useEffect } from 'react';
import { config } from '../services/config';

const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [loadingContext, setLoadingContext] = useState(true);

    const checkActiveOrder = async () => {
        const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
        if (!deliveryPartnerId) {
            setLoadingContext(false);
            return;
        }

        try {
            // Fetch assigned orders to see if there is an active one
            const response = await fetch(`${config.server}/delivery/orders/${deliveryPartnerId}?status=ASSIGNED`);
            const data = await response.json();

            // Assumes API returns { data: [...] } for this endpoint based on OrderList.jsx knowledge
            // or check how OrderList handled it.
            // OrderList: response.data.data || []

            const orders = data.data || [];
            if (orders.length > 0) {
                setActiveOrderId(orders[0].orderId);
            } else {
                setActiveOrderId(null);
            }
        } catch (error) {
            console.error("Error checking active order:", error);
        } finally {
            setLoadingContext(false);
        }
    };

    useEffect(() => {
        checkActiveOrder();
    }, []);

    const value = {
        activeOrderId,
        setActiveOrderId,
        checkActiveOrder,
        loadingContext
    };

    return (
        <DeliveryContext.Provider value={value}>
            {children}
        </DeliveryContext.Provider>
    );
}

export function useDelivery() {
    return useContext(DeliveryContext);
}
