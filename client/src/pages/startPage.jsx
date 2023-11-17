import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 


function Typewriter({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const typingInterval = setInterval(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, text]);

  return <span>{displayText}</span>;
}

Typewriter.propTypes = {
  text: PropTypes.string.isRequired, 
};

function StartPage() {
  const navigate = useNavigate(); 

  const welcomeText = "Welcome to performance prediction platform for players!";

  const navigateToHome = () => {
    navigate('/home'); 
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className='text-4xl font-bold mb-4'>
          <Typewriter text={welcomeText} />
        </h1>
        <button
          onClick={navigateToHome}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Start Predicting
        </button>
      </div>
    </div>
  );
}

export default StartPage;
