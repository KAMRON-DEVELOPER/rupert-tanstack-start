import { VacancyCardType } from '@/types/vacancy';

const VacancyCard = ({ v }: { v: VacancyCardType }) => {
  return (
    <div>
      <h1>title: {v.title}</h1>
      <h1>company name: {v.company.name}</h1>
      <h1>specialization: {v.specialization}</h1>
    </div>
  );
};

export default VacancyCard;
