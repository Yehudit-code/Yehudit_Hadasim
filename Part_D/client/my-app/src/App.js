import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './Components/OwnerPage';
import SupplierPage from './Components/SupplierPage';
import UserTypeSelector from './Components/UserTypeSelector';
import SupplierLogin from './Components/SupplierLogin';
import OwnerLogin from './Components/OwnerLogin';
import SupplierRegister from './Components/SupplierRegister';
import OwnerRegister from './Components/OwnerRegister';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserTypeSelector />} />
          {/* <Route path="/login/admin" element={<OwnerLogin />} /> */}
          <Route path="/login/owner" element={<OwnerLogin />} />

          <Route path="/login/supplier" element={<SupplierLogin />} />
          <Route path="/register/supplier" element={<SupplierRegister />} />
          <Route path="/register/owner" element={<OwnerRegister />} />
          <Route path="/owner" element={<AdminPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          {/* <Route path="/supplierHome" element={<SupplierHome />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
