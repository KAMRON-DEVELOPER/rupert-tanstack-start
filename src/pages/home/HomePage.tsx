import Footer from './Footer';
import Stats from './Stats';
import Hero from './Hero';
import Featured from './Featured';

const HomePage = () => {
  return (
    <div className='space-y-8'>
      <Hero />
      <Stats />
      <Featured />
      <Footer />
    </div>
  );
};

export default HomePage;
