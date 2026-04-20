const Hero = () => {
  return (
    <section className='relative flex flex-col h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)]'>
      <div className='absolute inset-y-0 left-8 right-8 rounded-2xl overflow-hidden'>
        <img
          src='/background.jpg'
          alt='background'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='relative h-full text-lg text-center font-jetbrains'>
        <div className='h-[25%]' />
        <h1 className='text-6xl text-center'>Rupert</h1>
        <p className='text-xl italic tracking-tighter'>Built by a dev, for devs.</p>
        <p className='text-xl tracking-tighter'>Share what you build, discover jobs, and stay close to the developer community.</p>
      </div>
    </section>
  );
};

export default Hero;
