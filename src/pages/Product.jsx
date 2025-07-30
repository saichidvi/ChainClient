import { useState } from 'react';

const Product = () => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productImage: '',
    productCost: '',
    discountPercentage: '',
    userId: ''
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          productImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDiscountAmount = () => {
    const cost = parseFloat(formData.productCost) || 0;
    const discount = parseFloat(formData.discountPercentage) || 0;
    return (cost * discount / 100).toFixed(2);
  };

  const calculateFinalPrice = () => {
    const cost = parseFloat(formData.productCost) || 0;
    const discountAmount = parseFloat(calculateDiscountAmount()) || 0;
    return (cost - discountAmount).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for backend
    const productData = {
      ...formData,
      discountAmount: calculateDiscountAmount(),
      finalPrice: calculateFinalPrice(),
      timestamp: new Date().toISOString()
    };
    
    // TODO: Send productData to backend API
    console.log('Product data to send to backend:', productData);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        productId: '',
        productName: '',
        productImage: '',
        productCost: '',
        discountPercentage: '',
        userId: ''
      });
      setImagePreview('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Product Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter unique product ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Cost (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productCost"
                  value={formData.productCost}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product cost"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchaser Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10-digit mobile number"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Mobile number of the registered user purchasing this product
                </p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-48 object-contain border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Discount (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter discount percentage"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Discount for parent referrals
                </p>
              </div>
              
              {/* Live Discount Calculation Display */}
              {formData.productCost && formData.discountPercentage && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Commission for Parent Referral</p>
                    <p className="text-2xl font-bold text-green-600">₹ {calculateDiscountAmount()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Submit Product Purchase
            </button>
            <button
              type="reset"
              onClick={() => {
                setFormData({ productId: '', productName: '', productImage: '', productCost: '', discountPercentage: '', userId: '' });
                setImagePreview('');
              }}
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Purchase Successful!</h3>
              <p className="text-gray-600 mb-4">Product purchase has been registered successfully.</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Product: {formData.productName}</p>
                <p className="text-sm text-gray-600 mb-2">Purchaser: {formData.userId}</p>
                <p className="text-lg font-bold text-blue-600">Final Price: ₹ {calculateFinalPrice()}</p>
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

export default Product;