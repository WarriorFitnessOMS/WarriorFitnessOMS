import React from 'react'
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
import Payments from './pages/admin/Payments'
import Members from './pages/admin/Members'
import Coaches from './pages/admin/Coaches'
import Attendance from './pages/admin/Attendance'
import Schedule from './pages/admin/Schedule'
import Support from './pages/admin/Support'
import Settings from './pages/admin/Settings'


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
            path="payments" 
            element={<ProtectedRoute role="admin"><Payments/></ProtectedRoute>} 
          />
          <Route 
            path="membership-requests" 
            element={<ProtectedRoute role="admin"><Approvals/></ProtectedRoute>} 
          />
          <Route 
            path="members" 
            element={<ProtectedRoute role="admin"><Members/></ProtectedRoute>} 
          />
          <Route 
            path="coaches" 
            element={<ProtectedRoute role="admin"><Coaches/></ProtectedRoute>} 
          />
          <Route 
            path="attendance" 
            element={<ProtectedRoute role="admin"><Attendance/></ProtectedRoute>} 
          />
          <Route 
            path="schedule" 
            element={<ProtectedRoute role="admin"><Schedule/></ProtectedRoute>} 
          />
          <Route 
            path="support" 
            element={<ProtectedRoute role="admin"><Support/></ProtectedRoute>} 
          />
          <Route 
            path="settings" 
            element={<ProtectedRoute role="admin"><Settings/></ProtectedRoute>} 
          />
          
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
