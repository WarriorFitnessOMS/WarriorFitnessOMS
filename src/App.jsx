import React from 'react'
import {  Route, Routes } from 'react-router-dom'

//Layouts
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

//Public pages
import Home from './pages/publicWeb/Home'
import Register from './pages/publicWeb/Register'
import Login from './pages/publicWeb/Login'

//import routes from routesConfig
import { adminRoutes, coachRoutes, memberRoutes } from './routes/routesConfig'



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
          {adminRoutes.map(({path, element}) => (
            <Route
              key={path}
              path={path}
              element = {<ProtectedRoute role="admin">{React.createElement(element)}</ProtectedRoute>}
            />
          ))}
        </Route>

        {/* COACH ROUTES */}
        <Route path="/coach">
          {coachRoutes.map(({path, element}) => (
              <Route
                key={path}
                path={path}
                element = {<ProtectedRoute role="coach">{React.createElement(element)}</ProtectedRoute>}
              />
            ))}
        </Route>

        {/* MEMBER ROUTES */}
        <Route path="/member">
          {memberRoutes.map(({path, element}) => (
              <Route
                key={path}
                path={path}
                element = {<ProtectedRoute role="member">{React.createElement(element)}</ProtectedRoute>}
              />
            ))}
        </Route>

      </Route>


    </Routes>
  )
}

export default App
