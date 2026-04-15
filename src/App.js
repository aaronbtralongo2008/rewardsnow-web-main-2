import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Home';
import BusinessList from './BusinessList';
import BusinessDetail from './BusinessDetail';
import Register from './Register';
import BusinessMap from './BusinessMap';
import BusinessRegister from './BusinessRegister';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import BusinessOwnerDashboard from './BusinessOwnerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import { ForgotPassword, ResetPassword } from './AuthPages';


function App() {
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = sessionStorage.getItem('rn_customer');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [selectedBusiness, setSelectedBusiness] = useState(() => {
    try {
      const saved = sessionStorage.getItem('rn_business');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      sessionStorage.setItem('rn_customer', JSON.stringify(customer));
    } else {
      sessionStorage.removeItem('rn_customer');
    }
  }, [customer]);

  useEffect(() => {
    if (selectedBusiness) {
      sessionStorage.setItem('rn_business', JSON.stringify(selectedBusiness));
    } else {
      sessionStorage.removeItem('rn_business');
    }
  }, [selectedBusiness]);

  const handleLogin = (data) => {
    setCustomer(data);
    navigate('/home');
  };

  const handleLogout = () => {
    setCustomer(null);
    setSelectedBusiness(null);
    sessionStorage.clear();
    navigate('/');
  };

  const handleSelectBusiness = (biz) => {
    setSelectedBusiness(biz);
    navigate('/business');
  };

  const Protected = ({ children }) => {
    if (!customer) return <Navigate to="/" replace />;
    return children;
  };

  const BusinessDetailWrapper = () => {
    if (!selectedBusiness) return <Navigate to="/businesses" replace />;
    return (
      <BusinessDetail
        business={selectedBusiness}
        customer={customer}
        onBack={() => navigate('/businesses')}
        onLogout={handleLogout}
        onRefresh={() => setRefreshKey(k => k + 1)}
      />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleLogin} onBack={() => navigate('/')} />} />
      <Route path="/business-register" element={<BusinessRegister onBack={() => navigate('/')} onSuccess={() => setRefreshKey(k => k + 1)} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/home" element={<Protected><Home customer={customer} onLogout={handleLogout} onNavigate={navigate} refreshKey={refreshKey} /></Protected>} />
      <Route path="/businesses" element={<Protected><BusinessList key={refreshKey} customer={customer} onLogout={handleLogout} onSelectBusiness={handleSelectBusiness} onNavigate={navigate} /></Protected>} />
      <Route path="/business" element={<Protected><BusinessDetailWrapper /></Protected>} />
      <Route path="/map" element={<Protected><BusinessMap key={refreshKey} customer={customer} onLogout={handleLogout} onNavigate={navigate} onSelectBusiness={handleSelectBusiness} /></Protected>} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/business-owner" element={<BusinessOwnerDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;