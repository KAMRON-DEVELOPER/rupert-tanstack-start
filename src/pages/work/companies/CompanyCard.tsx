import { CompanyCardSchema } from '@/types/company';

const CompanyCard = ({ v }: { v: CompanyCardSchema }) => {
  return (
    <div>
      <h1>title: {v.name}</h1>
      <h1>specialization: {v.tagline}</h1>
      <h1>open vacancies count: {v.openVacanciesCount}</h1>
    </div>
  );
};

export default CompanyCard;
