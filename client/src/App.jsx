import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Delivery from './pages/delivery/Delivery'
import Register from './pages/common/Register/Register'
import Login from './pages/common/Login/Login'
import Restaurant from './pages/restaurant/Restaurant'
import Customer from './pages/customer/Customer'
import ContactUs from './pages/common/ContactUs/ContactUs'
import { DeliveryProvider } from './context/DeliveryContext'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/*" element={<Customer />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/delivery/*" element={
          <DeliveryProvider>
            <Delivery />
          </DeliveryProvider>
        } />
        <Route path="/restaurant/*" element={<Restaurant />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App