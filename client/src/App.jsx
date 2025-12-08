import './App.css'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/delivery/Profile/Profile'
import EditProfile from './pages/delivery/EditProfile/EditProfile'
import Navbar from './components/common/Navbar/Navbar'
import Dashboard from './pages/customer/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import EditProfileActions from './components/common/EditProfileActions/EditProfileActions'
import OrderCard from './components/delivery/OrderCard/OrderCard'
import ClockButton from './components/delivery/ClockButton/ClockButton';
import CustomerMenu from './pages/customer/CustomerMenu/CustomerMenu'
import Admin from './pages/admin/Admin'
import CustomerOrderSummary from './pages/customer/CustomerOrderSummary/CustomerOrderSummary'
import CustomerOrders from './pages/customer/CustomerOrders/CustomerOrders'
import Delivery from './pages/delivery/Delivery'
import CustomerProfile from './pages/customer/CustomerProfile/CustomerProfile'
import CustomerEditProfile from './pages/customer/CustomerEditProfile/CustomerEditProfile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/customer/menu" element={<CustomerMenu />} />
        <Route path="/customer/order-summary" element={<CustomerOrderSummary />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/edit-profile" element={<CustomerEditProfile />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/delivery/*" element={<Delivery />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App