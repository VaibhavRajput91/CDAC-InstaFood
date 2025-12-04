import './App.css'
import {ToastContainer} from 'react-toastify'
import Profile from './pages/delivery/Profile/Profile'
import EditProfile from './pages/delivery/EditProfile/EditProfile'
import Navbar from './components/common/Navbar/Navbar'
import Dashboard from './pages/customer/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import EditProfileActions from './components/common/EditProfileActions/EditProfileActions'
import OrderCard from './components/delivery/OrderCard/OrderCard'
import ClockButton from './components/delivery/ClockButton/ClockButton';
import CustomerMenu from './pages/customer/CustomerMenu/CustomerMenu'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Navbar />} /> 
      <Route path="/customer/dashboard" element={<Dashboard />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
