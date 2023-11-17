import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VscArrowCircleRight } from 'react-icons/vsc';
import { gsap } from 'gsap';

function Typewriter({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    let typingInterval;
    if (currentIndex < text.length) {
      typingInterval = setInterval(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
    } else {
      clearInterval(typingInterval);
    }

    return () => clearInterval(typingInterval);
  }, [currentIndex, text]);

  return <h1 className='text-4xl font-bold mb-4 text-white'>{displayText}</h1>;
}

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

function StartPage() {
  const navigate = useNavigate();
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.to(backgroundRef.current, {
      backgroundColor: '#320073',
      duration: 1, // Duration of the animation in seconds
      width: '100%',
      ease: 'power2.inOut', // Easing function for a smooth transition
    });
  }, []);

  const welcomeText = "Welcome to the performance prediction platform!";

  const navigateToHome = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 h-full w-0"
        style={{ zIndex: -1 }}
      ></div>
      <Typewriter text={welcomeText} />
      <button
        onClick={navigateToHome}
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 flex items-center mt-4"
      >
        Start Predicting <VscArrowCircleRight className="ml-2 text-3xl" />
      </button>
    </div>
  );
}

export default StartPage;
