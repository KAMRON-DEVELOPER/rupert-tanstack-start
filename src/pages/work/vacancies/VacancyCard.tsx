import { VacancyCardSchema } from '@/types/vacancy';
import { Link } from '@tanstack/react-router';

const VacancyCard = ({ v }: { v: VacancyCardSchema }) => {
  return (
    <div className='border rounded-lg'>
      <h1>
        <Link
          to='/work/vacancies/$id'
          params={{ id: v.id }}>
          title: {v.title}
        </Link>
      </h1>
      <h1>company name: {v.company.name}</h1>
      <h1>specialization: {v.specialization}</h1>
    </div>
  );
};

export default VacancyCard;
