import './App.css'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/common/Navbar/Navbar'
import Dashboard from './pages/customer/Dashboard'
import { Route, Routes } from 'react-router-dom'

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
