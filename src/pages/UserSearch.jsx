import { useState } from 'react';

const UserSearch = () => {
  const [searchId, setSearchId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedLevels, setExpandedLevels] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  //to store one version
  // Mock data for demonstration - replace with actual API call
  const mockUserData = {
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, State 12345',
    refererId: '9876543200',
    registrationDate: '2024-01-15',
    walletAmount: 9999.00,
    referralLevels: [
      // Level 1 - Direct referrals
      [
        { id: '9876543211', name: 'Alice Smith', joinDate: '2024-02-10', amountEarned: 1502.00 },
        { id: '9876543212', name: 'Frank Wilson', joinDate: '2024-02-20', amountEarned: 1800.75 },
        { id: '9876543213', name: 'Sarah Johnson', joinDate: '2024-02-20', amountEarned: 1800.75 }
      ],
      // Level 2 - Referrals by Level 1 users (more than 8 for testing)
      [
        { id: '9876543221', name: 'Bob Wilson', referredBy: '9876543211', joinDate: '2024-03-01', amountEarned: 850.00 },
        { id: '9876543222', name: 'Carol Davis', referredBy: '9876543211', joinDate: '2024-03-05', amountEarned: 920.50 },
        { id: '9876543223', name: 'Eva Martinez', referredBy: '9876543212', joinDate: '2024-03-10', amountEarned: 1100.00 },
        { id: '9876543224', name: 'George Lee', referredBy: '9876543212', joinDate: '2024-03-15', amountEarned: 750.25 },
        { id: '9876543225', name: 'Harry Johnson', referredBy: '9876543211', joinDate: '2024-03-18', amountEarned: 680.00 },
        { id: '9876543226', name: 'Iris Brown', referredBy: '9876543213', joinDate: '2024-03-20', amountEarned: 990.75 },
        { id: '9876543227', name: 'Jack Smith', referredBy: '9876543212', joinDate: '2024-03-22', amountEarned: 550.50 },
        { id: '9876543228', name: 'Kate Wilson', referredBy: '9876543211', joinDate: '2024-03-25', amountEarned: 1250.00 },
        { id: '9876543229', name: 'Linda Brown', referredBy: '9876543211', joinDate: '2024-03-25', amountEarned: 1250.00 },
        { id: '9876543230', name: 'Mike Davis', referredBy: '9876543211', joinDate: '2024-03-25', amountEarned: 1250.00 },
      ],
      // Level 3 - Referrals by Level 2 users
      [
        { id: '9876543241', name: 'Helen Kim', referredBy: '9876543222', joinDate: '2024-04-01', amountEarned: 450.00 },
        { id: '9876543242', name: 'Ivan Chen', referredBy: '9876543223', joinDate: '2024-04-05', amountEarned: 380.25 },
        { id: '9876543243', name: 'Julia Park', referredBy: '9876543223', joinDate: '2024-04-10', amountEarned: 520.75 },
        { id: '9876543244', name: 'Nathan Chen', referredBy: '9876543221', joinDate: '2024-04-02', amountEarned: 1050.50 },
      ]
    ]
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      setError('Please enter a User ID');
      return;
    }

    setLoading(true);
    setError('');
    setIsEditing(false);
    
    // Simulate API call - replace with actual backend call
    setTimeout(() => {
      if (searchId === mockUserData.mobile) {
        setUserData(mockUserData);
      } else {
        setError('User not found');
        setUserData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({
      name: userData.name,
      mobile: userData.mobile,
      email: userData.email,
      address: userData.address,
      refererId: userData.refererId
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Prepare data for backend
    const updatedData = {
      ...userData,
      ...editedData
    };
    
    // TODO: Send to backend API
    console.log('Sending updated data to backend:', updatedData);
    
    // Update local state
    setUserData(updatedData);
    setIsEditing(false);
    setEditedData(null);
    
    // Show success message (you can add a toast notification here)
    alert('User details updated successfully!');
  };

  const getLevelColor = (level) => {
    const colors = [
      'bg-blue-500 hover:bg-blue-600',
      'bg-green-500 hover:bg-green-600',
      'bg-purple-500 hover:bg-purple-600',
      'bg-orange-500 hover:bg-orange-600',
      'bg-pink-500 hover:bg-pink-600'
    ];
    return colors[level % colors.length];
  };

  const ReferralNode = ({ user, levelIndex }) => {
    return (
      <div className={`${getLevelColor(levelIndex)} text-white rounded-lg p-4 shadow-lg transition-all transform hover:scale-105 cursor-pointer`}>
        <div className="text-xs font-mono mb-1">{user.id}</div>
        <div className="text-sm font-semibold">{user.name}</div>
        <div className="text-xs opacity-75 mt-1">Joined: {user.joinDate}</div>
        <div className="mt-2 pt-2 border-t border-white/20">
          <div className="text-sm font-bold">₹ {user.amountEarned?.toLocaleString('en-IN') || '0'}</div>
          <div className="text-xs opacity-75">Commission Earned</div>
        </div>
      </div>
    );
  };

  const toggleLevelExpansion = (levelIndex) => {
    setExpandedLevels(prev => ({
      ...prev,
      [levelIndex]: !prev[levelIndex]
    }));
  };

  const getSortedAndPaginatedUsers = (users, levelIndex) => {
    // Sort users by join date (earliest first)
    const sortedUsers = [...users].sort((a, b) => 
      new Date(a.joinDate) - new Date(b.joinDate)
    );

    // If level is not expanded, show only first 8
    if (!expandedLevels[levelIndex] && sortedUsers.length > 8) {
      return sortedUsers.slice(0, 8);
    }

    return sortedUsers;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Search</h1>
      
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Mobile Number (10 digits)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        )}
      </div>
      
      {/* User Details */}
      {userData && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">User Details</h2>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Mobile Number (User ID):</label>
                <p className="font-mono font-semibold">{userData.mobile}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold">{userData.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600">Mobile:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold">{userData.mobile}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600">Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold">{userData.email}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Address:</label>
                {isEditing ? (
                  <textarea
                    value={editedData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows="2"
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-semibold">{userData.address}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600">Referrer ID:</label>
                <p className="font-semibold">{userData.refererId}</p>

              </div>
              <div>
                <label className="text-sm text-gray-600">Registration Date:</label>
                <p className="font-semibold">{userData.registrationDate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Wallet Amount:</label>
                <p className="font-semibold text-green-600">₹ {userData.walletAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-4 mt-6 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          
          {/* Summary Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Network Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {userData.referralLevels.reduce((sum, level) => sum + level.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Referrals</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {userData.referralLevels.length}
                </p>
                <p className="text-sm text-gray-600">Network Depth</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {userData.referralLevels[0]?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Direct Referrals</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">
                  ₹ {userData.referralLevels.reduce((total, level) => 
                    total + level.reduce((levelTotal, user) => 
                      levelTotal + (user.amountEarned || 0), 0
                    ), 0).toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600">Total Commission</p>
              </div>
            </div>
          </div>
          
          {/* Referral Network Visualization */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Referral Network</h2>
            
            {/* Root User */}
            <div className="mb-8 text-center">
              <div className="inline-block bg-gray-800 text-white rounded-lg p-4 shadow-xl">
                <div className="text-xs font-mono mb-1">{userData.mobile}</div>
                <div className="text-lg font-bold">{userData.name}</div>
                <div className="text-xs opacity-75 mt-1">Root User</div>
              </div>
            </div>
            
            {/* Referral Levels */}
            <div className="space-y-8">
              {userData.referralLevels.map((level, levelIndex) => {
                const displayedUsers = getSortedAndPaginatedUsers(level, levelIndex);
                const isExpanded = expandedLevels[levelIndex];
                
                return (
                  <div key={levelIndex} className="relative">
                    {/* Level Header */}
                    <div className="flex items-center mb-4">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <div className="px-4">
                        <span className="text-sm font-semibold text-gray-600">
                          Level {levelIndex + 1} ({level.length} users)
                        </span>
                      </div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    
                    {/* Users in this level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                      {displayedUsers.map((user) => (
                        <ReferralNode key={user.id} user={user} levelIndex={levelIndex} />
                      ))}
                    </div>
                    
                    {/* Show More/Less Button */}
                    {level.length > 8 && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => toggleLevelExpansion(levelIndex)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full flex items-center gap-2 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show Less</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Show {level.length - 8} More</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    {/* Connection lines (visual only) */}
                    {levelIndex < userData.referralLevels.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <div className="w-px h-8 bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;