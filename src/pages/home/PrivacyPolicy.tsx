import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className='bg-primary-foreground text-foreground font-sans antialiased min-h-screen'>
      <div className='w-full pt-32 pb-24 max-w-3xl mx-auto px-6 min-h-[80vh]'>
        <Link
          to='/'
          className='mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'>
          <ArrowLeft className='w-4 h-4' />
          Back to home
        </Link>
        <h1 className='text-3xl font-semibold tracking-tight text-foreground mb-8'>Privacy Policy</h1>
        <div className='space-y-6 text-sm text-muted-foreground leading-relaxed'>
          <p>Last updated: October 24, 2023</p>

          <p>
            Your privacy is important to us. It is Poddle's policy to respect your privacy regarding any information we may collect from you across our website
            and other sites we own and operate.
          </p>

          <h2 className='text-lg font-medium text-foreground tracking-tight mt-8 mb-4'>1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge
            and consent. We also let you know why we're collecting it and how it will be used.
          </p>
          <p>The types of information we may collect include:</p>
          <ul className='list-disc pl-6 space-y-2 mt-4'>
            <li>Contact information (such as name, email address)</li>
            <li>Authentication data (such as passwords, OAuth tokens)</li>
            <li>Usage data and analytics</li>
            <li>Payment and billing information (processed securely via our partners)</li>
          </ul>

          <h2 className='text-lg font-medium text-foreground tracking-tight mt-8 mb-4'>2. Use of Information</h2>
          <p>We use the collected information for various purposes, including:</p>
          <ul className='list-disc pl-6 space-y-2 mt-4'>
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing your transactions and managing your account</li>
            <li>Communicating with you regarding updates, security alerts, and support</li>
            <li>Analyzing usage patterns to optimize user experience</li>
          </ul>

          <h2 className='text-lg font-medium text-foreground tracking-tight mt-8 mb-4'>3. Data Retention and Security</h2>
          <p>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within
            commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </p>

          <h2 className='text-lg font-medium text-foreground tracking-tight mt-8 mb-4'>4. Third-Party Services</h2>
          <p>
            We don't share any personally identifying information publicly or with third-parties, except when required to by law. Our website may link to
            external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
