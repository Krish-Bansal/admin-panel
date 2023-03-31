import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login"
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Resetpassword from './pages/Resetpassword';
import Enquiries from './pages/Enquiries'
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Productlist from './pages/Productlist';
import Addcolor from './pages/Addcolor';
import AddCategory from './pages/AddCategory';
import Addproduct from './pages/Addproduct';
const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/reset-password' element={<Resetpassword />} />
      <Route path='/forgot-password' element={<Forgotpassword />} />
      <Route path='/admin' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='enquiries' element={<Enquiries />} />
        <Route path='orders' element={<Orders />} />
        <Route path='customers' element={<Customers />} />
        <Route path='list-color' element={<Colorlist />} />
        <Route path='list-category' element={<Categorylist />} />
        <Route path='product-list' element={<Productlist />} />
        <Route path='color' element={<Addcolor />} />
        <Route path='category' element={<AddCategory />} />
        <Route path='product' element={<Addproduct />} />











      </Route>


    </Routes>

  );
};

export default App;
