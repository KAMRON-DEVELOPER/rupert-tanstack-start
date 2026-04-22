import { CompanyCardSchema } from '@/types/company';
import { Link } from '@tanstack/react-router';

const CompanyCard = ({ c: c }: { c: CompanyCardSchema }) => {
  return (
    <div>
      <h1>
        <Link
          to='/work/vacancies/$id'
          params={{ id: c.id }}>
          title: {c.name}
        </Link>
      </h1>
      <h1>specialization: {c.tagline}</h1>
      <h1>open vacancies count: {c.openVacanciesCount}</h1>
    </div>
  );
};

export default CompanyCard;
