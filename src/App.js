import React, { useEffect } from 'react';
import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import Home from './Home';
import Create from './Pages/create';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MakeUser from './Pages/makeUser';
import MyJobs from './Pages/myJobs';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"

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


function App() {
  return (
    <AuthProvider>
      <Router>
        <SpeedInsights/>
        <RouteChangeTracker />
        <Routes>
          <Route path="/makeUser" element={<MakeUser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={<Home />} />
          <Route path="/:jobId" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/myJobs" element={<MyJobs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;