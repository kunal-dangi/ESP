import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Hero from './components/Hero';
import Problem from './components/Problem';
import ProductDemo from './components/ProductDemo';
import HowItWorks from './components/HowItWorks';
import ForStartups from './components/ForStartups';
import StartupForm from './components/StartupForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard'; // Import the new dashboard
import Pricing from './components/Pricing';
import SyntrixApproach from './components/SyntrixApproach';
import MarketOpportunity from './components/MarketOpportunity';
import CompetitiveLandscape from './components/CompetitiveLandscape';
import Roadmap from './components/Roadmap';

const LandingPage = () => (
  <>
    <Hero />
    <Problem />
    <SyntrixApproach />
    <ProductDemo />
    <MarketOpportunity />
    <HowItWorks />
    <CompetitiveLandscape />
    <ForStartups />
    <Pricing />
    <StartupForm />
    <Roadmap />
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother initial animation
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
