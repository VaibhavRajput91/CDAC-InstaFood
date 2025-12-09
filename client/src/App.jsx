import './App.css'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/common/Navbar/Navbar'
import Dashboard from './pages/customer/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import CustomerMenu from './pages/customer/CustomerMenu/CustomerMenu'
import Admin from './pages/admin/Admin'
import CustomerOrderSummary from './pages/customer/CustomerOrderSummary/CustomerOrderSummary'
import CustomerOrders from './pages/customer/CustomerOrders/CustomerOrders'
import Delivery from './pages/delivery/Delivery'
import CustomerProfile from './pages/customer/CustomerProfile/CustomerProfile'
import CustomerEditProfile from './pages/customer/CustomerEditProfile/CustomerEditProfile'
import Register from './pages/common/Register/Register'
import Login from './pages/common/Login/Login'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
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