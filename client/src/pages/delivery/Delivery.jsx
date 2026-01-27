import { useState } from 'react';
import { Dashboard } from './Dashboard/Dashboard';
import { OrdersList } from './OrderList/OrdersList';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { OrderHistory } from './OrderHistory/OrderHistory';
import { Wallet } from './Wallet/Wallet';
import { Profile } from './Profile/Profile';
import { EditProfile } from './EditProfile/EditProfile';
import { Apply } from './Apply';
// import { Support } from './components/Support';
// import { Login } from './components/Login';
// import { Onboarding } from './components/Onboarding';
// import { Notifications } from './components/Notifications';
// import { Settings } from './components/Settings';

export default function Delivery() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const navigateTo = (screen, orderId) => {
    if (orderId) {
      setSelectedOrderId(orderId);
    }
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    // if (!hasCompletedOnboarding) {
    //   return <Onboarding onComplete={handleOnboardingComplete} />;
    // }

    switch (currentScreen) {
      case 'apply':
        return <Apply navigateTo={navigateTo} />
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
