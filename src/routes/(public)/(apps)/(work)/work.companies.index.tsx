import CompaniesPage from '@/pages/work/companies/CompaniesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(apps)/(work)/work/companies/')({
  component: CompaniesPage,
});
