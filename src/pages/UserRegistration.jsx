import { useState } from 'react';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    refererId: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for backend
    const userData = {
      ...formData,
      refererId: formData.refererId || 'none'
    };
    
    // TODO: Send userData to backend API
    console.log('User data to send to backend:', userData);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        address: '',
        refererId: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Registration</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 10-digit mobile number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter complete address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referrer ID <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="refererId"
              value={formData.refererId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter referrer's ID (if any)"
            />
            <p className="text-sm text-gray-500 mt-1">Leave empty if no referrer</p>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Register User
            </button>
            <button
              type="reset"
              onClick={() => setFormData({ name: '', mobile: '', email: '', address: '', refererId: '' })}
              className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">User has been registered successfully.</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">User ID (Mobile Number):</p>
                <p className="text-xl font-mono font-bold text-blue-600">{formData.mobile}</p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;