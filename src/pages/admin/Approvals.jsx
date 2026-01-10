const Approvals = () => {
    // 1. Fetch pending users from your backend
    // const [pendingUsers, setPendingUsers] = useState([]);
  
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">New Registration Requests</h2>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role Requested</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your pending users here */}
            <tr className="border-b border-gray-800">
              <td className="p-3">John Doe</td>
              <td className="p-3">john@example.com</td>
              <td className="p-3">Member</td>
              <td className="p-3">
                <button className="bg-green-600 px-3 py-1 rounded mr-2">Approve</button>
                <button className="bg-red-600 px-3 py-1 rounded">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Approvals;