import React, { useState, useEffect } from 'react';
import { 
  MdShoppingBag, 
  MdPerson, 
  MdHome, 
  MdHelp, 
  MdExitToApp,
  MdLock,
  MdStar,
  MdLocalShipping,
  MdCheckCircle,
  MdEdit,
  MdEmail,
  MdPhone,
  MdFace,
  MdCalendarToday,
  MdClose,
  MdSave
} from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const userId = userInfo?._id; // Safe check
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const [activeSection, setActiveSection] = useState(sectionParam || 'profileInfo');
  
  // State for API management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // State for user data
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [editMode, setEditMode] = useState({
    name: false,
    gender: false,
    email: false,
    mobile: false
  });
  const [tempData, setTempData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: ''
  });

  // Addresses state
  const [addresses, setAddresses] = useState({});
  const [editingAddress, setEditingAddress] = useState(null);
  const [tempAddress, setTempAddress] = useState({});
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });
        setProfileData(response.data);
        // Initialize local state with fetched data
        if (response.data) {
          setUserName(response.data.name);
          setGender(response.data.gender || 'Male');
          setEmail(response.data.emailOrPhone);
          setMobile(response.data.emailOrPhone);
          
          // Initialize tempData
          setTempData({
            name: response.data.name,
            gender: response.data.gender || 'Male',
            email: response.data.emailOrPhone,
            mobile: response.data.emailOrPhone
          });

          // Convert addresses to the format your component expects
          const addressesObj = {};
          let defaultAddrKey = '';
          response.data.addresses.forEach((addr, index) => {
            const key = addr.isDefault ? 'default' : `addr_${index}`;
            addressesObj[key] = {
              type: addr.type,
              line1: addr.line1,
              line2: addr.line2 || '',
              city: addr.city,
              state: addr.state,
              zip: addr.zip,
              phone: addr.phone
            };
            if (addr.isDefault) {
              defaultAddrKey = key;
            }
          });
          setAddresses(addressesObj);
          setDefaultAddress(defaultAddrKey);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  useEffect(() => {
    const newSection = searchParams.get('section');
    if (newSection && newSection !== activeSection) {
      setActiveSection(newSection);
    }
  }, [searchParams, activeSection]);

  const handleEditClick = (field) => {
    setEditMode(prev => ({...prev, [field]: true}));
  };

  const handleSaveClick = async (field) => {
    try {
      setEditMode(prev => ({...prev, [field]: false}));
      
      // Update local state first
      switch(field) {
        case 'name':
          setUserName(tempData.name);
          break;
        case 'gender':
          setGender(tempData.gender);
          break;
        case 'email':
          setEmail(tempData.email);
          break;
        case 'mobile':
          setMobile(tempData.mobile);
          break;
        default:
          break;
      }
      
      // Send update to server
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/update/${userId}`,
        {
          [field]: tempData[field]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setProfileData(response.data);
    } catch (err) {
      console.error('Error updating profile:', err);
      // Revert local state on error
      switch(field) {
        case 'name':
          setUserName(profileData.name);
          setTempData(prev => ({...prev, name: profileData.name}));
          break;
        case 'gender':
          setGender(profileData.gender);
          setTempData(prev => ({...prev, gender: profileData.gender}));
          break;
        case 'email':
          setEmail(profileData.email);
          setTempData(prev => ({...prev, email: profileData.email}));
          break;
        case 'mobile':
          setMobile(profileData.mobile);
          setTempData(prev => ({...prev, mobile: profileData.mobile}));
          break;
      }
    }
  };

  const handleCancelClick = (field) => {
    setEditMode(prev => ({...prev, [field]: false}));
    setTempData(prev => ({
      ...prev,
      [field]: field === 'name' ? userName : 
               field === 'gender' ? gender : 
               field === 'email' ? email : mobile
    }));
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({...prev, [field]: value}));
  };

  // Address functions
  const handleEditAddress = (addressKey) => {
    setEditingAddress(addressKey);
    setTempAddress(addresses[addressKey]);
  };

  const handleSaveAddress = async (addressKey) => {
    try {
      // Convert addresses to array format for API
      const addressesArray = Object.entries(addresses).map(([key, addr]) => ({
        ...addr,
        isDefault: key === addressKey
      }));
      
      // Update local state
      setAddresses(prev => ({
        ...prev,
        [addressKey]: tempAddress
      }));
      setEditingAddress(null);
      
      // Send update to server
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/addresses/${userId}`,
        { addresses: addressesArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setProfileData(response.data);
      setDefaultAddress(addressKey);
    } catch (err) {
      console.error('Error updating addresses:', err);
    }
  };

  const handleCancelEditAddress = () => {
    setEditingAddress(null);
  };

  const handleAddressInputChange = (field, value) => {
    setTempAddress(prev => ({...prev, [field]: value}));
  };

  const handleNewAddressInputChange = (field, value) => {
    setNewAddress(prev => ({...prev, [field]: value}));
  };

  const handleAddAddress = async () => {
    try {
      const newKey = `addr_${Date.now()}`;
      const updatedAddresses = {
        ...addresses,
        [newKey]: newAddress  
      };
      
      // Convert addresses to array format for API
      const addressesArray = Object.entries(updatedAddresses).map(([key, addr]) => ({
        ...addr,
        isDefault: false
      }));
      
      // Send update to server
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/addresses/${userId}`,
        { addresses: addressesArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setAddresses(updatedAddresses);
      setProfileData(response.data);
      setShowAddAddressForm(false);
      setNewAddress({
        type: 'Home',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
      });
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  const handleRemoveAddress = async (addressKey) => {
    try {
      const newAddresses = {...addresses};
      delete newAddresses[addressKey];
      
      // Convert addresses to array format for API
      const addressesArray = Object.entries(newAddresses).map(([key, addr]) => ({
        ...addr,
        isDefault: key === defaultAddress
      }));
      
      // Send update to server
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/addresses/${userId}`,
        { addresses: addressesArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setAddresses(newAddresses);
      setProfileData(response.data);
      if (defaultAddress === addressKey) {
        setDefaultAddress(Object.keys(newAddresses)[0] || '');
      }
    } catch (err) {
      console.error('Error removing address:', err);
    }
  };

  // Sample data
  const orders = [
    { id: '12345', date: '2023-06-12', status: 'delivered', items: 3, total: 125.99 },
    { id: '12346', date: '2023-06-05', status: 'shipped', items: 2, total: 89.99 }
  ];

  const sections = {
    myOrders: {
      title: 'My Orders',
      icon: <MdShoppingBag className="nav-icon" />,
      content: (
        <div className="profile-content-box">
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <div className="empty-state">
              <img src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png" alt="No orders" width="120" />
              <h3>No Orders Yet</h3>
              <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
              <button className="btn-primary">Start Shopping</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span>Order #{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status === 'delivered' ? (
                        <MdCheckCircle className="status-icon" />
                      ) : (
                        <MdLocalShipping className="status-icon" />
                      )}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="order-details">
                    <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    <button className="btn-track">Track Order</button>
                    <button className="btn-reorder">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    },
    profileInfo: {
      title: 'Profile Information',
      icon: <MdPerson className="nav-icon" />,
      content: (
        <div className="profile-content-box">
          <h2>Personal Information</h2>
          
          {loading ? (
            <div className="loading-state">Loading profile data...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : (
            <div className="profile-info-card">
              <div className="info-item">
                <div className="info-icon">
                  <MdFace />
                </div>
                <div className="info-content">
                  <h3>Your Name</h3>
                  {editMode.name ? (
                    <div className="edit-mode">
                      <input 
                        type="text" 
                        value={tempData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="edit-input"
                      />
                      <div className="edit-actions">
                        <button 
                          className="btn-save"
                          onClick={() => handleSaveClick('name')}
                        >
                          <MdSave /> Save
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelClick('name')}
                        >
                          <MdClose /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <p>{userName}</p>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditClick('name')}
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MdFace />
                </div>
                <div className="info-content">
                  <h3>Your Gender</h3>
                  {editMode.gender ? (
                    <div className="edit-mode">
                      <select 
                        value={tempData.gender} 
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="edit-input"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      <div className="edit-actions">
                        <button 
                          className="btn-save"
                          onClick={() => handleSaveClick('gender')}
                        >
                          <MdSave /> Save
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelClick('gender')}
                        >
                          <MdClose /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <p>{gender}</p>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditClick('gender')}
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MdEmail />
                </div>
                <div className="info-content">
                  <h3>Email Address</h3>
                  {editMode.email ? (
                    <div className="edit-mode">
                      <input 
                        type="email" 
                        value={tempData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="edit-input"
                      />
                      <div className="edit-actions">
                        <button 
                          className="btn-save"
                          onClick={() => handleSaveClick('email')}
                        >
                          <MdSave /> Save
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelClick('email')}
                        >
                          <MdClose /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <p>{email}</p>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditClick('email')}
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MdPhone />
                </div>
                <div className="info-content">
                  <h3>Mobile Number</h3>
                  {editMode.mobile ? (
                    <div className="edit-mode">
                      <input 
                        type="tel" 
                        value={tempData.mobile} 
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="edit-input"
                      />
                      <div className="edit-actions">
                        <button 
                          className="btn-save"
                          onClick={() => handleSaveClick('mobile')}
                        >
                          <MdSave /> Save
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelClick('mobile')}
                        >
                          <MdClose /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <p>{mobile}</p>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditClick('mobile')}
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MdCalendarToday />
                </div>
                <div className="info-content">
                  <h3>Member Since</h3>
                  <p>January 15, 2023</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    manageAddresses: {
      title: 'Manage Addresses',
      icon: <MdHome className="nav-icon" />,
      content: (
        <div className="profile-content-box">
          <h2>Your Addresses</h2>
          {loading ? (
            <div className="loading-state">Loading addresses...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : (
            <div className="addresses-list">
              {Object.keys(addresses).length === 0 ? (
                <div className="empty-state">
                  <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No addresses" width="120" />
                  <h3>No Addresses Saved</h3>
                  <p>You haven't added any addresses yet. Add your first address below.</p>
                </div>
              ) : (
                Object.entries(addresses).map(([key, address]) => (
                  <div key={key} className={`address-card ${defaultAddress === key ? 'default' : ''}`}>
                    <div className="address-header">
                      <span className="address-type">
                        {editingAddress === key ? (
                          <select
                            value={tempAddress.type}
                            onChange={(e) => handleAddressInputChange('type', e.target.value)}
                            className="edit-input"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          address.type
                        )}
                      </span>
                      {defaultAddress === key && (
                        <span className="default-badge">
                          <MdStar className="star-icon" /> Default
                        </span>
                      )}
                    </div>
                    <div className="address-details">
                      {editingAddress === key ? (
                        <>
                          <input
                            type="text"
                            value={tempAddress.line1}
                            onChange={(e) => handleAddressInputChange('line1', e.target.value)}
                            className="edit-input"
                            placeholder="Address Line 1"
                          />
                          <input
                            type="text"
                            value={tempAddress.line2}
                            onChange={(e) => handleAddressInputChange('line2', e.target.value)}
                            className="edit-input"
                            placeholder="Address Line 2 (Optional)"
                          />
                          <div className="address-edit-row">
                            <input
                              type="text"
                              value={tempAddress.city}
                              onChange={(e) => handleAddressInputChange('city', e.target.value)}
                              className="edit-input"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={tempAddress.state}
                              onChange={(e) => handleAddressInputChange('state', e.target.value)}
                              className="edit-input"
                              placeholder="State"
                            />
                            <input
                              type="text"
                              value={tempAddress.zip}
                              onChange={(e) => handleAddressInputChange('zip', e.target.value)}
                              className="edit-input"
                              placeholder="ZIP Code"
                            />
                          </div>
                          <input
                            type="tel"
                            value={tempAddress.phone}
                            onChange={(e) => handleAddressInputChange('phone', e.target.value)}
                            className="edit-input"
                            placeholder="Phone Number"
                          />
                        </>
                      ) : (
                        <>
                          <p>{address.line1}</p>
                          <p>{address.line2}</p>
                          <p>{address.city}, {address.state} {address.zip}</p>
                          <p>Phone: {address.phone}</p>
                        </>
                      )}
                    </div>
                    <div className="address-actions">
                      {editingAddress === key ? (
                        <>
                          <button 
                            className="btn-save"
                            onClick={() => handleSaveAddress(key)}
                          >
                            <MdSave /> Save
                          </button>
                          <button 
                            className="btn-cancel"
                            onClick={handleCancelEditAddress}
                          >
                            <MdClose /> Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditAddress(key)}
                          >
                            <MdEdit /> Edit
                          </button>
                          {defaultAddress !== key && (
                            <>
                              <button 
                                className="btn-set-default"
                                onClick={() => setDefaultAddress(key)}
                              >
                                Set as Default
                              </button>
                              <button 
                                className="btn-remove"
                                onClick={() => handleRemoveAddress(key)}
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showAddAddressForm ? (
                <div className="address-card">
                  <div className="address-header">
                    <select
                      value={newAddress.type}
                      onChange={(e) => handleNewAddressInputChange('type', e.target.value)}
                      className="edit-input"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="address-details">
                    <input
                      type="text"
                      value={newAddress.line1}
                      onChange={(e) => handleNewAddressInputChange('line1', e.target.value)}
                      className="edit-input"
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      value={newAddress.line2}
                      onChange={(e) => handleNewAddressInputChange('line2', e.target.value)}
                      className="edit-input"
                      placeholder="Address Line 2 (Optional)"
                    />
                    <div className="address-edit-row">
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => handleNewAddressInputChange('city', e.target.value)}
                        className="edit-input"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => handleNewAddressInputChange('state', e.target.value)}
                        className="edit-input"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        value={newAddress.zip}
                        onChange={(e) => handleNewAddressInputChange('zip', e.target.value)}
                        className="edit-input"
                        placeholder="ZIP Code"
                      />
                    </div>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => handleNewAddressInputChange('phone', e.target.value)}
                      className="edit-input"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="address-actions">
                    <button 
                      className="btn-save"
                      onClick={handleAddAddress}
                      disabled={!newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.phone}
                    >
                      <MdSave /> Save Address
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={() => setShowAddAddressForm(false)}
                    >
                      <MdClose /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className="btn-add-address"
                  onClick={() => setShowAddAddressForm(true)}
                >
                  + Add New Address
                </button>
              )}
            </div>
          )}
        </div>
      )
    },
    security: {
      title: 'Login & Security',
      icon: <MdLock className="nav-icon" />,
      content: (
        <div className="profile-content-box">
          <h2>Account Security</h2>
          <div className="security-section">
            <div className="security-item">
              <div className="security-icon">
                <MdLock />
              </div>
              <div className="security-content">
                <h3>Password</h3>
                <p>Last changed 3 months ago</p>
                <button className="btn-change-password">Change Password</button>
              </div>
            </div>
            <div className="security-item">
              <div className="security-icon">
                <MdLock />
              </div>
              <div className="security-content">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security</p>
                <button className="btn-enable-2fa">Enable 2FA</button>
              </div>
            </div>
            <div className="security-item">
              <div className="security-icon">
                <MdLock />
              </div>
              <div className="security-content">
                <h3>Recent Activity</h3>
                <p>Last login: Today at 2:45 PM from Chrome, Windows</p>
                <button className="btn-view-activity">View All Activity</button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    faqs: {
      title: 'FAQs',
      icon: <MdHelp className="nav-icon" />,
      content: (
        <div className="profile-content-box">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-section">
            <div className="faq-item">
              <h3>How do I track my order?</h3>
              <p>Once your order ships, you'll receive a tracking number via email. You can also check the status in your Orders section.</p>
            </div>
            <div className="faq-item">
              <h3>How do I change my account information?</h3>
              <p>You can update your profile information in the Profile section. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and select digital wallets.</p>
            </div>
          </div>
        </div>
      )
    },
    logout: {
      title: 'Logout',
      icon: <MdExitToApp className="nav-icon" />,
      content: (
        <div className="profile-content-box profile-logout-box">
          <div className="logout-icon">
            <MdExitToApp size={48} />
          </div>
          <h2>Ready to leave?</h2>
          <p>Are you sure you want to logout of your account?</p>
          <div className="logout-actions">
            <button className="btn-logout-confirm">Yes, Logout</button>
            <button className="btn-logout-cancel">Cancel</button>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-greeting">
          <h1>Hello, {userName}</h1>
          <p>Welcome back to your account</p>
        </div>
        <div className="profile-summary">
          <div className="summary-item">
            <span className="summary-label">Member since</span>
            <span className="summary-value">Jan 2023</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Loyalty points</span>
            <span className="summary-value">1,250</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Recent order</span>
            <span className="summary-value">Delivered yesterday</span>
          </div>
        </div>
      </div>
      
      <div className="profile-layout">
        <nav className="profile-nav">
          <ul>
            {Object.entries(sections).map(([key, section]) => (
              <li 
                key={key}
                className={activeSection === key ? 'active' : ''}
                onClick={() => {
                  setActiveSection(key);
                  setSearchParams({ section: key });
                }}
              >
                {section.icon}
                {section.title}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="profile-main-content">
          <h2>
            {sections[activeSection].icon}
            {sections[activeSection].title}
          </h2>
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
};

export default Profile;