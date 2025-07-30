import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    // { path: '/', name: 'Home', icon: '🏠' },
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/user-registration', name: 'User Registration', icon: '👤' },
    { path: '/user-search', name: 'User Search', icon: '🔍' },
    { path: '/product', name: 'Product Purchase', icon: '🛍️' },
    // { path: '/projects', name: 'Projects', icon: '📁' },
    // { path: '/tasks', name: 'Tasks', icon: '✓' },
    // { path: '/settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">Aarka Jewellers</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;