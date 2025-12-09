import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import CustomerMenu from './CustomerMenu/CustomerMenu'
import CustomerOrderSummary from './CustomerOrderSummary/CustomerOrderSummary'
import CustomerOrders from './CustomerOrders/CustomerOrders'
import CustomerProfile from './CustomerProfile/CustomerProfile'
import CustomerEditProfile from './CustomerEditProfile/CustomerEditProfile'


function Customer() {

  return (
    <>
      <Routes>
        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/order-summary" element={<CustomerOrderSummary />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/edit-profile" element={<CustomerEditProfile />} />
        <Route path="/" element={<Dashboard />} />
        

      </Routes>
    </>
  )
}

export default Customer