import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming you create this

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth(); // Get current user from context

  // If not logged in, force to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role (e.g., Member trying to access Admin)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // or redirect to their own dashboard
  }

  // Authorized! Render the page
  return children;
};

export default ProtectedRoute;