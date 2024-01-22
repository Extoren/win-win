import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import Header from './header';
import Home from './Home';
import Create from './Pages/create';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Home />} />
        <Route path="/:jobId" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
  </Router>
  );
}

export default App;
