import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Assuming you have this

const Sidebar = () => {
  const { user } = useAuth(); // Get the logged-in user (user.role = 'admin' | 'coach' | 'member')
  const location = useLocation();

  // Define links for each role based on your SRS and UI
  const roleLinks = {
    admin: [
      { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
      { label: "Approvals", path: "/admin/approvals", icon: "✅" }, // Added as you requested
      { label: "Payments", path: "/admin/payments", icon: "💳" },   // [cite: 884]
      { label: "Coaches", path: "/admin/coaches", icon: "👟" },
      { label: "Members", path: "/admin/members", icon: "👥" },     // [cite: 885]
      { label: "Activity Logs", path: "/admin/logs", icon: "📝" },  // [cite: 928]
      { label: "Support", path: "/admin/support", icon: "🎧" }
    ],
    coach: [
      { label: "Dashboard", path: "/coach/dashboard", icon: "📊" },
      { label: "My Students", path: "/coach/students", icon: "👥" }, // [cite: 813]
      { label: "Workouts", path: "/coach/workouts", icon: "💪" },    // [cite: 767]
      { label: "Videos", path: "/coach/videos", icon: "🎥" },        // [cite: 854]
    ],
    member: [
      { label: "Dashboard", path: "/member/dashboard", icon: "📊" },
      { label: "My Plan", path: "/member/plan", icon: "📋" },        // [cite: 470]
      { label: "Progress", path: "/member/progress", icon: "📈" },   // [cite: 589]
    ]
  };

  // Select links based on the user's role (fallback to empty array if no user)
  const linksToRender = user ? roleLinks[user.role] : [];

  return (
    <div className="sidebar">
      <div className="logo">WARRIOR FITNESS</div>
      
      <nav>
        {linksToRender.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            <span className="icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;