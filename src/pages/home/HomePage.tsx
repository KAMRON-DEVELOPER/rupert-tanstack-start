import Footer from './Footer';
import Stats from './Stats';
import Hero from './Hero';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className='flex flex-col font-sans antialiased'>
      <Navbar />
      <Hero />
      <Stats />
      <Footer />
    </div>
  );
};

export default HomePage;
