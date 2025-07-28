import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserRegistration from './pages/UserRegistration';
import UserSearch from './pages/UserSearch';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user-registration" element={<UserRegistration />} />
            <Route path="user-search" element={<UserSearch />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App