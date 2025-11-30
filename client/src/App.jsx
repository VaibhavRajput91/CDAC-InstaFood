import './App.css'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/common/Navbar/Navbar'
import Dashboard from './pages/customer/Dashboard'

function App() {

  return (
    <>
      <Navbar />
      <Dashboard />
      <ToastContainer />
    </>
  )
}

export default App
