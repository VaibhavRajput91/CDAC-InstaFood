import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import RestaurantNavbar from '../../components/restaurant/RestaurantNavbar/RestaurantNavbar';
import RestaurantDashboard from './RestaurantDashboard/RestaurantDashboard';
import Apply from './Apply/Apply';
import RestaurantOrderDetails from './RestaurantOrderDetails/RestaurantOrderDetails';
import RestaurantOrders from './RestaurantOrders/RestaurantOrders';
import RestaurantProfile from './RestaurantProfile/RestaurantProfile'
import RestaurantEditProfile from './RestaurantEditProfile/RestaurantEditProfile'
import ManageMenu from './ManageMenu/ManageMenu';
import Revenue from './Revenue/Revenue';
import AddDish from './AddDish/AddDish';
import EditDish from './EditDish/EditDish';
import AdminApprove from './Apply/AdminApprove/AdminApprove';

function Restaurant() {
  const location = useLocation();
  const hideNavbarRoutes = ['/restaurant/apply', '/restaurant/apply/approve'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <RestaurantNavbar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to="statistics" />}
        />
        <Route path="/statistics" element={<RestaurantDashboard />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply/approve" element={<AdminApprove />}
        />
        <Route path="/order-details" element={<RestaurantOrderDetails />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/profile" element={<RestaurantProfile />} />
        <Route path="/edit-profile" element={<RestaurantEditProfile />} />
        <Route path="/menu/dishes" element={<ManageMenu />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/add-dish" element={<AddDish />} />
        <Route path="/dish/edit/:menuId/:dishId" element={<EditDish />} />
      </Routes>


    </div>
  )
}

export default Restaurant
