function Navbar() {
  return (
    <div className="w-full p-2 bg-transparent backdrop-blur z-50 flex fixed top-0 left-0 shadow-lg justify-center">
      <img
        className="h-[50]"
        src={
          "https://resources.pulse.icc-cricket.com/whitelabel-assets/100364/logo-light.svg"
        }
        alt="Main Logo"
      />
    </div>
  );
}

export default Navbar;
