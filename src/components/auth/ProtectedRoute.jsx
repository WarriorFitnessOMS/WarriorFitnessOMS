import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming you create this

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth(); // Get current user from context

  // 1. If not logged in, force to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but wrong role (e.g., Member trying to access Admin)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // or redirect to their own dashboard
  }

  // 3. Authorized! Render the page
  return children;
};

export default ProtectedRoute;