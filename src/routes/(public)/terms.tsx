import TermsOfServicePage from '@/pages/home/TermsOfService';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/terms')({
  component: TermsOfServicePage,
});
