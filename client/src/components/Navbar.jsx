import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full p-2 bg-transparent backdrop-blur z-50 flex flex-col md:flex-row fixed top-0 left-0 shadow-lg justify-between">
      <img
        className="h-[50] mx-auto md:mx-0"
        src="https://resources.pulse.icc-cricket.com/whitelabel-assets/100364/logo-light.svg"
        alt="Main Logo"
      />
      <div className="flex justify-center md:justify-end items-center font-medium space-x-4">
        <Link to="/battinganalysis" className="text-gray-200 hover:text-gray-100">
          Batting Analysis
        </Link>
        <Link to="/bowlinganalysis" className="text-gray-200 hover:text-gray-100">
          Bowling Analysis
        </Link>
        <Link to="/teamanalysis" className="text-gray-200 hover:text-gray-100">
          Team Analysis
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
