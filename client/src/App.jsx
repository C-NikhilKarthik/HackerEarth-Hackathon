import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import StartPage from "./pages/startPage";
import Navbar from "./components/Navbar";
import BowlingAnalysis from "./pages/BowlingAnalysis";
import TeamAnalysis from "./pages/TeamAnalysis";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <WelcomePage />;
  }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/battinganalysis" element={<HomePage />} />
          <Route path="/bowlinganalysis" element={<BowlingAnalysis />} />
          <Route path="/teamanalysis" element={<TeamAnalysis/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
