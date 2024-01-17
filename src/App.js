import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import Header from './header';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
      </Routes>
  </Router>
  );
}

export default App;
