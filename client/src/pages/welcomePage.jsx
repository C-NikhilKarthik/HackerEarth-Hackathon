import Lottie from 'lottie-react';
import trophyAnimation from '../assets/trophy.json';

const WelcomePage = () => {

  return (
    <div className='bg-white' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie
        animationData={trophyAnimation}
        loop={false}
        autoplay
        style={{ width: '50%', height: '50%', maxWidth: '800px', maxHeight: '800px' }}
      />
    </div>
  );
};

export default WelcomePage;
