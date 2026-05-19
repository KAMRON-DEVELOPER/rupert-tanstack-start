const Hero = () => {
  return (
    <section className="relative flex h-[calc(100vh-3rem)] flex-col md:h-[calc(100vh-3.5rem)]">
      <div className="absolute inset-y-0 right-8 left-8 overflow-hidden rounded-2xl">
        <img src="/background.jpg" alt="background" className="h-full w-full object-cover" />
      </div>

      <div className="font-jetbrains relative h-full text-center text-lg">
        <div className="h-[25%]" />
        <h1 className="text-center text-6xl">Rupert</h1>
        <p className="text-xl tracking-tighter italic">Built by a dev, for devs.</p>
        <p className="text-xl tracking-tighter">
          Share what you build, discover jobs, and stay close to the developer community.
        </p>
      </div>
    </section>
  )
}

export default Hero
