const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Aarkaaa Jewellers Chain Software</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">98</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">70</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Orders Completed</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">In Progress</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">99</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">User Sai Chidvi registered</p>
            <p className="text-sm text-gray-600">2 hours ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold">User Ramesh deactivated</p>
            <p className="text-sm text-gray-600">5 hours ago</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold">Ganesg Idol sold out</p>
            <p className="text-sm text-gray-600">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;