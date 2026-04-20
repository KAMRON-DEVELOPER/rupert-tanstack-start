import PrivacyPolicyPage from '@/pages/home/PrivacyPolicy';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/privacy')({
  component: PrivacyPolicyPage,
});
