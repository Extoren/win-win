import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import Home from './Home';
import Create from './Pages/create';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MakeUser from './Pages/makeUser';

function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/makeUser" element={<MakeUser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={<Home />} />
          <Route path="/:jobId" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
