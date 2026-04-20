import Footer from './Footer';
import Stats from './Stats';
import Hero from './Hero';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className='relativex'>
      <img
        src='/background.jpg'
        alt='background'
        className='absolute h-screen w-full object-center'
      />

      <div className='relative flex flex-col'>
        <Navbar />
        <Hero />
        <Stats />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
