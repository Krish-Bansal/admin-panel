import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login"
// import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
// import Resetpassword from './pages/Resetpassword';
import Enquiries from './pages/Enquiries'
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Productlist from './pages/Productlist';
import Addcolor from './pages/Addcolor';
import AddCategory from './pages/AddCategory';
import Addproduct from './pages/Addproduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
const App = () => {
  return (

    <Routes>
      <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
      {/* <Route path='/reset-password' element={<Resetpassword />} /> */}
      {/* <Route path='/forgot-password' element={<Forgotpassword />} /> */}
      <Route path='/admin' element={<PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>}>
        <Route index element={<Dashboard />} />
        <Route path='enquiries' element={<Enquiries />} />
        <Route path='enquiries/:id' element={<ViewEnq />} />

        <Route path='orders' element={<Orders />} />
        <Route path='order/:id' element={<ViewOrder />} />
        <Route path='shipping/:id' element={<ViewOrder />} />


        <Route path='customers' element={<Customers />} />
        <Route path='list-color' element={<Colorlist />} />
        <Route path='coupon-list' element={<Couponlist />} />
        <Route path='coupon' element={<AddCoupon />} />
        <Route path='coupon/:id' element={<AddCoupon />} />



        <Route path='list-category' element={<Categorylist />} />
        <Route path='product-list' element={<Productlist />} />
        <Route path='color' element={<Addcolor />} />
        <Route path='color/:id' element={<Addcolor />} />

        <Route path='category' element={<AddCategory />} />
        <Route path='category/:id' element={<AddCategory />} />

        <Route path='product' element={<Addproduct />} />











      </Route>
    </Routes>

  );
};

export default App;
