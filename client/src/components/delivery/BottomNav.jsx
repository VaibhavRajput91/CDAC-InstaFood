import { Home, Package, Clock, Wallet, User } from 'lucide-react';

export function BottomNav({ currentScreen, navigateTo }) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
      <div className="flex items-center justify-around max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                isActive
                  ? 'text-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'fill-orange-100' : ''
                }`}
              />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
