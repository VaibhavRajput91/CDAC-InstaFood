import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dashboard } from './Dashboard/Dashboard';
import { OrdersList } from './OrderList/OrdersList';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { OrderHistory } from './OrderHistory/OrderHistory';
import { Wallet } from './Wallet/Wallet';
import { Profile } from './Profile/Profile';
import { EditProfile } from './EditProfile/EditProfile';
import { Apply } from './Apply';
import { Settings } from './Settings';
import { Support } from '../common/ContactUs/Support';
import { Notifications } from './Notifications';
import { ApprovalPending } from './ApprovalPending';
import { config } from '../../services/config';

export default function Delivery() {
  const [currentScreen, setCurrentScreen] = useState('loading'); // Start with loading to check status
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [registeredAsDeliveryPartner, setRegisteredAsDeliveryPartner] = useState(!!sessionStorage.getItem('deliveryPartnerId'));
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    checkInitialStatus();
  }, []);

  const checkInitialStatus = async () => {
    const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
    if (!deliveryPartnerId) {
      setCurrentScreen('apply');
      return;
    }

    try {
      const response = await axios.get(`${config.server}/delivery/status`, {
        params: { deliveryPartnerId }
      });

      if (response.data.status === 'PENDING') {
        setCurrentScreen('approval-pending');
      } else if (response.data.status === 'REJECTED') {
        setCurrentScreen('apply');
      } else {
        setCurrentScreen('dashboard');
      }
    } catch (error) {
      console.error("Error checking initial status:", error);
      // Fallback: If error, maybe dashboard or keep at loading? 
      // Let's assume dashboard so old users aren't blocked by API error, 
      // OR better, 'approval-pending' with error state? 
      // Given existing flow, if we have ID, let's try dashboard.
      setCurrentScreen('dashboard');
    }
  };

  const navigateTo = (screen, orderId) => {
    if (orderId) {
      setSelectedOrderId(orderId);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {


    switch (currentScreen) {
      case 'loading':
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;
      case 'apply':
        return <Apply navigateTo={navigateTo} />
      case 'approval-pending':
        return <ApprovalPending navigateTo={navigateTo} />
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'orders':
        return <OrdersList navigateTo={navigateTo} />;
      case 'order-details':
        return (
          <OrderDetails
            navigateTo={navigateTo}
            orderId={selectedOrderId}
          />
        );
      case 'history':
        return <OrderHistory navigateTo={navigateTo} />;
      case 'wallet':
        return <Wallet navigateTo={navigateTo} />;
      case 'profile':
        return <Profile navigateTo={navigateTo} />;
      case 'edit-profile':
        return <EditProfile navigateTo={navigateTo} />;
      case 'support':
        return <Support navigateTo={navigateTo} />;
      case 'notifications':
        return <Notifications navigateTo={navigateTo} />;
      case 'settings':
        return <Settings navigateTo={navigateTo} />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
}
