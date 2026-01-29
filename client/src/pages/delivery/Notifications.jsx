import {
  ArrowLeft,
  Package,
  DollarSign,
  Bell,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Available',
    message: 'Pizza Palace - 1.2 km away - ₹45 payout',
    time: '2 min ago',
    read: false,
    icon: Package,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    type: 'earning',
    title: 'Payment Received',
    message: '₹847 earned today. Great job!',
    time: '1 hour ago',
    read: false,
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '3',
    type: 'order',
    title: 'New Order Available',
    message: 'Burger King - 2.5 km away - ₹65 payout',
    time: '2 hours ago',
    read: true,
    icon: Package,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '4',
    type: 'alert',
    title: 'Document Expiring Soon',
    message: 'Your driving license expires in 30 days',
    time: '5 hours ago',
    read: false,
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: '5',
    type: 'success',
    title: 'Order Completed',
    message: 'Order #ORD001 delivered successfully',
    time: 'Yesterday',
    read: true,
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '6',
    type: 'earning',
    title: 'Weekly Bonus Unlocked',
    message: '₹150 bonus added to your wallet',
    time: 'Yesterday',
    read: true,
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '7',
    type: 'alert',
    title: 'Account Update',
    message: 'Your profile rating improved to 4.8',
    time: '2 days ago',
    read: true,
    icon: Bell,
    color: 'bg-purple-100 text-purple-600'
  }
];

export function Notifications({ navigateTo }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl">Notifications</h1>
          </div>
          <button className="text-orange-500 text-sm">
            Mark all read
          </button>
        </div>

        {unreadCount > 0 && (
          <p className="text-sm text-gray-500 px-9">
            {unreadCount} unread notification
            {unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-2">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${notification.read
                  ? 'border-gray-100'
                  : 'border-orange-200 bg-orange-50/30'
                }`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-12 h-12 ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-gray-900">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
