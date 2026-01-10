import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">WELCOME BACK, Admin!</h1>
          <p className="text-gray-400">Admin</p>
        </div>
        <div className="notification-icon">🔔</div>
      </div>

      {/* Analytics Cards - Matching your Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard number="188" label="Active Members" sub="+2 from last month" />
        <StatsCard number="5" label="Coaches" sub="+2 from last month" />
        <StatsCard number="6" label="New Programs" sub="-1 vs last month" />
        <StatsCard number="$2,450" label="Monthly Revenue" sub="+$450 this month" />
      </div>

      {/* Chart Section Placeholder */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">Monthly Revenue Trends</h2>
        <div className="h-64 bg-gray-700 flex items-center justify-center text-gray-400">
          [Chart Component Goes Here]
        </div>
      </div>
    </div>
  );
};

// Simple reusable card component
const StatsCard = ({ number, label, sub }) => (
  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
    <h3 className="text-2xl font-bold text-orange-500">{number}</h3>
    <p className="font-semibold text-white">{label}</p>
    <p className="text-xs text-green-400">{sub}</p>
  </div>
);

export default AdminDashboard;