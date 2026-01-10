import React from 'react'
import Navbar from './components/publicWeb/Navbar'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/publicWeb/Home'
import Register from './pages/publicWeb/Register'
import Login from './pages/publicWeb/Login'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import Approvals from './pages/admin/Approvals'
import CoachDashboard from './pages/coach/CoachDashboard'
import MemberDashboard from './pages/member/MemberDashboard'


const App = () => {
  return (
    <Routes>
      {/* -------PUBLIC ZONE--------- */}
      <Route element={<PublicLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Route>



      {/* SHARED DASHBOARD LAYOUT */}
      <Route element={<DashboardLayout />}>
        
        {/* ADMIN ROUTES */}
        <Route path="/admin">
          <Route 
            path="dashboard" 
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="approvals" 
            element={<ProtectedRoute role="admin"><Approvals/></ProtectedRoute>} 
          />
          <Route path="members" element={<div>Member Management Page</div>} />
        </Route>

        {/* COACH ROUTES */}
        <Route path="/coach">
           <Route 
             path="dashboard" 
             element={<ProtectedRoute role="coach"><CoachDashboard /></ProtectedRoute>} 
           />
        </Route>

        {/* MEMBER ROUTES */}
        <Route path="/member">
           <Route 
             path="dashboard" 
             element={<ProtectedRoute role="member"><MemberDashboard /></ProtectedRoute>} 
           />
        </Route>

      </Route>


    </Routes>
  )
}

export default App
