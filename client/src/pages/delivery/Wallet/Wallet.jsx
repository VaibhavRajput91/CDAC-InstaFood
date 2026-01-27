import { useState, useEffect } from 'react';
import {
  ArrowLeft
} from 'lucide-react';
import { BottomNav } from '../../../components/delivery/BottomNav';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const earningsData = {
  daily: [
    { name: 'Mon', earnings: 547 },
    { name: 'Tue', earnings: 623 },
    { name: 'Wed', earnings: 489 },
    { name: 'Thu', earnings: 712 },
    { name: 'Fri', earnings: 856 },
    { name: 'Sat', earnings: 1034 },
    { name: 'Sun', earnings: 847 }
  ],
  weekly: [
    { name: 'Week 1', earnings: 3245 },
    { name: 'Week 2', earnings: 4123 },
    { name: 'Week 3', earnings: 3867 },
    { name: 'Week 4', earnings: 4521 }
  ],
  monthly: [
    { name: 'Aug', earnings: 12456 },
    { name: 'Sep', earnings: 14234 },
    { name: 'Oct', earnings: 13567 },
    { name: 'Nov', earnings: 15890 },
    { name: 'Dec', earnings: 14234 }
  ]
};

const transactions = [
  { id: '1', type: 'credit', description: 'Order #ORD001 Completed', amount: 45, date: 'Today, 2:45 PM' },
  { id: '2', type: 'credit', description: 'Order #ORD002 Completed', amount: 65, date: 'Today, 1:30 PM' },
  { id: '3', type: 'debit', description: 'Withdrawal to Bank', amount: -500, date: 'Yesterday, 6:00 PM' },
  { id: '4', type: 'credit', description: 'Order #ORD003 Completed', amount: 38, date: 'Yesterday, 8:15 PM' },
  { id: '5', type: 'credit', description: 'Weekly Bonus', amount: 150, date: 'Dec 6, 10:00 AM' },
  { id: '6', type: 'credit', description: 'Order #ORD004 Completed', amount: 78, date: 'Dec 6, 3:20 PM' }
];

export function Wallet({navigateTo}){
  const [walletSummary, setWalletSummary] = useState({
    todayCollection: 0.0,
    weekCollection: 0.0,
    monthCollection: 0.0
  });

  useEffect(() => {
      fetch('http://localhost:8080/delivery/wallet/summary?deliveryPartnerId=5')
        .then(res => res.json())
        .then(data => {
          setWalletSummary({
            todayCollection: data.todayCollection || 0.0,
            weekCollection: data.weekCollection || 0.0,
            monthCollection: data.monthCollection
          });
          setLoading(false);
        })
        .catch(() => {
          
        });
    }, []);

    const [transactions, setTransactions] = useState([]);
    const [txnLoading, setTxnLoading] = useState(true);


    useEffect(() => {
  fetch('http://localhost:8080/delivery/wallet/transactions?deliveryPartnerId=5&size=5')
    .then(res => res.json())
    .then(data => {
      setTransactions(
        data.map(order => ({
          id: order.orderId,
          type: 'credit', // Let us assume transactions are credits
          description: `Order #${order.orderId} ${order.orderStatus}`,
          amount: order.earnings,
          date: '—' // backend doesn’t provide date yet
        }))
      );
      setTxnLoading(false);
    })
    .catch(() => {
      setTxnLoading(false);
    });
  }, []);

   
  const [period, setPeriod] = useState('daily');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigateTo('dashboard')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Wallet & Earnings</h1>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-lg mb-6">
          <p className="text-green-100 mb-1">Available Balance</p>
          <h2 className="text-5xl mb-6">₹2,450</h2>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Today</p>
            <p className="text-2xl text-gray-900">₹{walletSummary.todayCollection}</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Week</p>
            <p className="text-2xl text-gray-900">₹{walletSummary.weekCollection}</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Month</p>
            <p className="text-2xl text-gray-900">₹{walletSummary.monthCollection}</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
            </div>
          </div>
        </div>

        {/* Earnings Graph */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-gray-900 mb-4">Earnings Trend</h3>

          {/* Period Selector */}
          <div className="flex gap-2 mb-4">
            {['daily', 'weekly', 'monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  period === p
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData[period]}>
                <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ fill: '#F97316', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Transaction History</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.orderId}
                className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-green-100`}>
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div
                  className={
                    transaction.type === 'credit'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }
                >
                  {transaction.amount > 0 ? '+' : ''}
                  ₹{Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav
        currentScreen="wallet"
        navigateTo={navigateTo}
      />
    </div>
  );
}
