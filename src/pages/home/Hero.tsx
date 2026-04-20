const Hero = () => {
  return (
    <section className='flex flex-col h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] mt-12 md:mt-16'>
      <div className='h-[20%]' />

      <div className='text-center text-lg font-jetbrains'>
        <h1 className='text-5xl text-center'>Rupert</h1>
        <p className='italic tracking-tighter'>Built by a dev, for devs.</p>
        <p className='tracking-tighter'>Share what you build, discover jobs, and stay close to the developer community.</p>
      </div>
    </section>
  );
};

export default Hero;
