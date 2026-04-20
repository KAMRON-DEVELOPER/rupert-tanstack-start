import { Mail, Phone } from 'lucide-react';
import { SiTelegram } from '@icons-pack/react-simple-icons';
import { Link } from '@tanstack/react-router';
import RupertSvg from '@/assets/icons/RupertSvg';

const contact = [
  { href: 'mailto:atajanovkamronbek2003@gmail.com', icon: Mail, label: 'atajanovkamronbek2003@gmail.com' },
  { href: 'tel:+998971181203', icon: Phone, label: '+998 97 118 12 03' },
  { href: 'https://t.me/lockdown2003', icon: SiTelegram, label: '@lockdown2003' },
];

const Footer = () => (
  <footer>
    <div className='grid md:grid-cols-3 space-x-32 p-8 border-y'>
      <div>
        <Link
          to='/'
          className='flex items-center gap-2 text-lg font-semibold tracking-tighter'>
          <RupertSvg className='size-8' />
          Rupert
        </Link>
        <p className='text-sm max-w-md'>A platform for sharing projects, finding jobs, publishing posts, and connecting with the community.</p>
      </div>

      <div className='space-y-2 text-sm'>
        <h5 className='font-semibold'>Contact</h5>
        <ul className='space-y-2 text-muted-foreground'>
          {contact.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2'>
                <Icon className='size-4' /> {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='space-y-2 text-sm'>
        <h5 className='font-semibold'>Company</h5>
        <ul className='space-y-2 text-muted-foreground'>
          <li>
            <a
              href='https://t.me/rupert_uz'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'>
              <SiTelegram className='size-4' /> Community
            </a>
          </li>
          <li>
            <Link to='/terms'>Terms of Service</Link>
          </li>
          <li>
            <Link to='/privacy'>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>

    <p className='text-center text-xs py-2'>© {new Date().getFullYear()} Rupert. All rights reserved.</p>
  </footer>
);

export default Footer;
