import { Mail, Phone } from 'lucide-react';
import { SiTelegram } from '@icons-pack/react-simple-icons';
import { Link } from '@tanstack/react-router';

const Footer = () => {
  return (
    <footer
      id='main-footer'
      className='border-t pt-16 pb-8 mt-auto z-10 relative transition-all duration-300'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          <div className='col-span-1 md:col-span-2'>
            <Link
              to='/'
              className='text-xl font-semibold tracking-tighter text-foreground mb-4 block'>
              Poddle
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs leading-relaxed'>
              A modern Platform-as-a-Service that makes deploying and scaling your containers effortless.
            </p>
          </div>

          <div>
            <h5 className='text-sm font-semibold text-foreground mb-4'>Contact Us</h5>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li>
                <a
                  href='mailto:atajanovkamronbek2003@gmail.com'
                  className='flex items-center gap-2 hover:text-primary transition-colors'>
                  <Mail className='w-4 h-4' /> atajanovkamronbek2003@gmail.com
                </a>
              </li>
              <li>
                <a
                  href='tel:+998971181203'
                  className='flex items-center gap-2 hover:text-primary transition-colors'>
                  <Phone className='w-4 h-4' /> +998 97 118 12 03
                </a>
              </li>
              <li>
                <a
                  href='https://t.me/lockdown2003'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-primary transition-colors'>
                  <SiTelegram className='w-4 h-4' /> @lockdown2003
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className='text-sm font-semibold text-foreground mb-4'>Company</h5>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li>
                <a
                  href='https://t.me/poddle_uz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-primary transition-colors'>
                  <SiTelegram className='w-4 h-4' /> Community (@poddle_uz)
                </a>
              </li>
              <li>
                <Link
                  to='/terms'
                  className='hover:text-primary transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to='/privacy'
                  className='hover:text-primary transition-colors'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border'>
          <p className='text-xs text-muted-foreground mb-4 md:mb-0'>© {new Date().getFullYear()} Poddle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
