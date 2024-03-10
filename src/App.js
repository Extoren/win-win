import React, { useEffect, useContext } from 'react';
import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import Home from './Home';
import Create from './Pages/create';
import { AuthProvider, AuthContext } from './AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MakeUser from './Pages/makeUser';
import MyJobs from './Pages/myJobs';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';
import JobDetailView from './Home';
import './i18n';
import { Navigate } from 'react-router-dom';
import useUserRole from './hooks/useUserRole';
import Profile from './Pages/profile';
import Settings from './Pages/settings';

const ProtectedRoute = ({ children }) => {
    const { role, isLoading } = useUserRole();

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    return role === 'Voksen' ? children : <Navigate to="/" replace />;
};

NProgress.configure({ speed: 200 }); // Adjust the speed as needed

const RouteChangeTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    if (currentPath.current !== location.pathname) {
      NProgress.start();
      currentPath.current = location.pathname;

      // Delay the call to NProgress.done to simulate the end of route change
      setTimeout(() => {
        NProgress.done();
      }, 100); // Adjust the delay as needed
    }

    return () => {
      NProgress.remove();
    };
  }, [location, navigate]);

  return null;
};

const SettingsRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();

  if (isLoading) {
      return <div>laster...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Analytics />
        <SpeedInsights/>
        <RouteChangeTracker />
        <Routes>
          <Route path="/settings" element={<SettingsRoute><Settings /></SettingsRoute>} />
          <Route path="/win/:userId" element={<Profile />} />
          <Route path="/makeUser" element={<MakeUser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={<Home />} />
          <Route path="/:jobId" element={<JobDetailView />} />
          <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/myJobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;