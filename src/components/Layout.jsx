import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { username, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        {/* Header with user info and logout */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Aarka Jewellers Management</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, <span className="font-semibold">{username}</span></span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;