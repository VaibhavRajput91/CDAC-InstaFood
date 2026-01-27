import {
  ArrowLeft,
  MessageCircle,
  Phone,
  HelpCircle,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
// import { BottomNav } from '../../../components/delivery/';

const faqs = [
  {
    id: '1',
    question: 'How do I update my bank details?',
    answer:
      'Go to Profile → Documents → Bank Details to update your account information.'
  },
  {
    id: '2',
    question: 'When will I receive my earnings?',
    answer:
      'Earnings are available for withdrawal immediately after order completion.'
  },
  {
    id: '3',
    question: 'What if customer is not reachable?',
    answer:
      'Try calling 3 times. If still unreachable, contact support through chat.'
  },
  {
    id: '4',
    question: 'How to report order issues?',
    answer:
      'Use the "Report Issue" button on the order details page.'
  },
  {
    id: '5',
    question: 'Can I cancel an accepted order?',
    answer:
      'Yes, but frequent cancellations may affect your acceptance rate and account standing.'
  }
];

export function Support({ navigateTo }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo ? navigateTo('dashboard') : window.history.back()}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Support & Help</h1>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-8 h-8" />
            <div>
              <h3 className="text-xl">Emergency Helpline</h3>
              <p className="text-red-100 text-sm">Available 24/7</p>
            </div>
          </div>
          <button className="w-full bg-white text-red-600 py-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call Emergency Support
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-900 text-center">Chat Support</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Avg. 2 min response
            </p>
          </button>

          <button className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-900 text-center">Call Support</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Mon-Sun, 9AM-9PM
            </p>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-1">
            {faqs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition-colors">
                  <span className="text-gray-900 text-sm">
                    {faq.question}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="pb-4 px-2 text-sm text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Help Topics */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Help Topics</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">Account & Profile</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">Payments & Earnings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">Order Issues</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">
                App & Technical Support
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors">
              <span className="text-gray-700">
                Safety & Insurance
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* <BottomNav
        currentScreen="support"
        navigateTo={navigateTo}
      /> */}
    </div>
  );
}
