import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Admin dashboard
import DashboardClient from './pages/DashboardClient'; // Client dashboard
import Login from './pages/Login';
import ManageMenu from './pages/ManageMenu';
import ManageOrders from './pages/ManageOrders';
import ManageUsers from './pages/ManageUsers';
import Signup from './pages/Signup';
import CreateOrder from './pages/CreateOrder';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client-dashboard" element={<DashboardClient />} />
      <Route path="/manage-orders" element={<ManageOrders />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-menu" element={<ManageMenu />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Routes>
  );
};

export default App;

