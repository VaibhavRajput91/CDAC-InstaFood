import './App.css'
import {ToastContainer} from 'react-toastify'
import Profile from './pages/delivery/Profile/Profile'
import EditProfile from './pages/delivery/EditProfile/EditProfile'
import Navbar from './components/common/Navbar/Navbar'
// import Dashboard from './pages/customer/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/delivery/Dashboard/Dashboard';
// import Dashboard from './components/admin/Dashboard/Dashboard';

function App() {

  return (
    <>
      {/* <Routes> */}
      {/* <Route path="/" element={<Navbar />} />
      <Route path="/customer/dashboard" element={<Dashboard />} /> */}
      <Profile />
      <Dashboard />

      {/* </Routes> */}
      <ToastContainer />
    </>
  )
}

export default App
