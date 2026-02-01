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
import { config } from '../../../services/config'

export function Wallet({ navigateTo }) {
  const [walletSummary, setWalletSummary] = useState({
    todayCollection: 0.0,
    weekCollection: 0.0,
    monthCollection: 0.0
  });
  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const deliveryPartnerId = sessionStorage.getItem("deliveryPartnerId");
    if (!deliveryPartnerId) return;

    axios.get(`${config.server}/delivery/wallet/summary`, {
      params: { deliveryPartnerId }
    })
      .then(res => {
        setWalletSummary({
          todayCollection: res.data.todayCollection || 0.0,
          weekCollection: res.data.weekCollection || 0.0,
          monthCollection: res.data.monthCollection || 0.0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching wallet summary", err);
        setLoading(false);
      });
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [txnLoading, setTxnLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.server}/delivery/wallet/transactions?deliveryPartnerId=${sessionStorage.deliveryPartnerId}&size=10`)
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
      .catch(err => {
        console.error("Error fetching transactions", err);
        setTxnLoading(false);
      });
  }, []);

  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const dpId = sessionStorage.getItem("deliveryPartnerId");
        if (!dpId) return;

        const res = await axios.get(`${config.server}/delivery/wallet/earnings-trend`, {
          params: { deliveryPartnerId: sessionStorage.deliveryPartnerId, range: period }
        });

        // Backend returns: [today, yesterday, ..., 6-steps-ago]
        const rawData = res.data;
        const processedData = rawData.map((val, index) => {
          let name = '';
          const date = new Date();
          if (period === 'daily') {
            date.setDate(date.getDate() - index);
            name = date.toLocaleDateString('en-US', { weekday: 'short' });
          } else if (period === 'weekly') {
            name = index === 0 ? 'This Week' : `Week -${index}`;
          } else if (period === 'monthly') {
            date.setMonth(date.getMonth() - index);
            name = date.toLocaleDateString('en-US', { month: 'short' });
          }
          return { name, earnings: val };
        }).reverse();

        setTrendData(processedData);
      } catch (err) {
        console.error("Error fetching trend data", err);
      }
    };
    fetchTrend();
  }, [period]);


  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigateTo('dashboard')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Earnings</h1>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-4">

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
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${period === p
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
              <LineChart data={trendData}>
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
