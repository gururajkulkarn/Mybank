import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import NewContact from './Pages/NewContact';
// import Register from './Pages/Register';

import Login from './Pages/Login';
import SuperAdmin from './auth/SuperAdmin';
import Admin from './auth/Admin';

import Home from './Pages/Home';
import FinantialSettings from './Pages/FinantialSettings';
import NewMember from './Pages/NewMember';

import SactionLoan from './Pages/SactionLoan';
import ShortLoan from './Pages/ShortLoan';
import LongLoan from './Pages/LongLoan';

import MonthlyCollection from './Pages/MonthlyCollection';
import Reports from './Pages/Reports';

import UserDashboard from './Pages/UserDashboard';

import NotFound from './Pages/NotFound';
import AdminAction from './Pages/AdminAction';

function App() {

  return (
    <div className="grid-container">

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Superadmin Routes */}
          <Route path="/superadmin" element={<SuperAdmin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />

          <Route path="/home" element={<Home />} />
          <Route path="/financesetting" element={<FinantialSettings />} />
          <Route path="/newMember" element={<NewMember />} />

          {/* Loan Routes */}
          <Route path="/sanctionLoan" element={<SactionLoan />} />
          <Route path="/shortloan" element={<ShortLoan />} />
          <Route path="/longloan" element={<LongLoan />} />

          {/* Monthly Routes */}
          <Route path="/monthlycollection" element={<MonthlyCollection />} />
          <Route path="/adminaction" element={<AdminAction/>} />

          <Route path="/monthlyReports" element={<Reports />} />


          {/* User Routes */}
          <Route path="/user" element={<UserDashboard />} />

          {/* 404 Error Page for unmatched routes */}
          <Route path="*" element={<NotFound />} />

          {/* Extra Routes */}
          {/* <Route path="/newcontact" element={<NewContact />} /> */}
          {/* <Route path="/register" element={<Register/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
