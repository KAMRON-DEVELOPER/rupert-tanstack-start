import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className='p-3 md:p-8 mt-12 md:mt-16 '>
      <div className='grid items-center gap-6 md:grid-cols-[40fr_60fr]'>
        {/* Headline + CTA */}
        <div className='text-center md:text-left space-y-6 md:space-y-8'>
          {/* Headline */}
          <div className='space-y-1'>
            <p className='text-3xl md:text-5xl font-bold tracking-tight leading-tight animate-fade-in-up'>Deploying apps</p>

            <p className='text-2xl md:text-4xl font-medium italic tracking-tight leading-tigh animate-fade-in-up animation-delay-[50ms]'>
              has never been this simple
            </p>
          </div>

          {/* Info */}
          <p className='text-xs md:text-sm leading-snug text-muted-foreground animate-fade-in-up animation-delay-[50ms]'>
            Poddle is a modern Platform-as-a-Service that makes deploying and scaling applications effortless. Deploy from Git, Dockerfiles, or prebuilt images
            with built-in CI/CD — and switch between them anytime.
          </p>

          {/* CTA */}
          <div className='flex justify-center md:justify-start items-center gap-4 animate-fade-in-up animation-delay-[50ms]'>
            <Link
              to='/auth'
              className='inline-flex h-10 items-center gap-2 px-6 bg-primary text-sm font-semibold text-background rounded-full transition hover:opacity-90'>
              <span>Try for free</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to='/'
              className='inline-flex h-11 items-center px-6 border text-sm font-medium rounded-full transition hover:bg-muted'>
              Home
            </Link>
          </div>
        </div>

        {/* Video */}
        <div className='overflow-hidden border rounded'>
          <div className='aspect-video'>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload='metadata'
              poster='/demo-poster.png'>
              <source
                src='/demo.webm'
                type='video/webm'
              />
              <source
                src='/demo.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
