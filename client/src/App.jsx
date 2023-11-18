import { useEffect, useState } from "react";
import HomePage from "./pages/homePage";
import WelcomePage from "./pages/welcomePage";

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import StartPage from "./pages/startPage";

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
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
