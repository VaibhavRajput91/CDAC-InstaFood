import {
  ArrowLeft,
  Bell,
  Globe,
  Moon,
  Upload,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from '../../components/delivery/BottomNav';

export function Settings({ navigateTo }) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [earningsUpdates, setEarningsUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        enabled ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('profile')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Settings</h1>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Enable all notifications
                </p>
              </div>
              <Toggle
                enabled={pushNotifications}
                onChange={() =>
                  setPushNotifications(!pushNotifications)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Order Alerts</p>
                <p className="text-sm text-gray-500">
                  New order notifications
                </p>
              </div>
              <Toggle
                enabled={orderAlerts}
                onChange={() =>
                  setOrderAlerts(!orderAlerts)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Earnings Updates</p>
                <p className="text-sm text-gray-500">
                  Payment & bonus alerts
                </p>
              </div>
              <Toggle
                enabled={earningsUpdates}
                onChange={() =>
                  setEarningsUpdates(!earningsUpdates)
                }
              />
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Language</h3>
          </div>

          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
            <div>
              <p className="text-gray-900">App Language</p>
              <p className="text-sm text-gray-500">English</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Appearance</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-500">
                Use dark theme
              </p>
            </div>
            <Toggle
              enabled={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        {/* Documents Upload */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Documents</h3>
          </div>

          <div className="space-y-1">
            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <div>
                <p className="text-gray-900">Driving License</p>
                <p className="text-sm text-green-600">
                  Verified
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <div>
                <p className="text-gray-900">
                  Vehicle Registration
                </p>
                <p className="text-sm text-green-600">
                  Verified
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <div>
                <p className="text-gray-900">
                  Insurance Papers
                </p>
                <p className="text-sm text-orange-600">
                  Expires in 30 days
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <div>
                <p className="text-gray-900">Bank Details</p>
                <p className="text-sm text-green-600">
                  Verified
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">
                Terms & Conditions
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">
                Privacy Policy
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">About App</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="py-3 px-2">
              <p className="text-sm text-gray-500">
                App Version 2.4.1
              </p>
            </div>
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
