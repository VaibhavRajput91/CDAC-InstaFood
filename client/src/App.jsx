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
import ProtectedRoute from './components/common/ProtectedRoute'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/customer/*" element={
          <ProtectedRoute requiredRole="ROLE_CUSTOMER">
            <Customer />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="ROLE_ADMIN">
            <Admin />
          </ProtectedRoute>
        } />
        
        <Route path="/delivery/*" element={
          <ProtectedRoute requiredRole="ROLE_DELIVERY_PARTNER">
            <DeliveryProvider>
              <Delivery />
            </DeliveryProvider>
          </ProtectedRoute>
        } />
        
        <Route path="/restaurant/*" element={
          <ProtectedRoute requiredRole="ROLE_RESTAURANT">
            <Restaurant />
          </ProtectedRoute>
        } />
        
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App