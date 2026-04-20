const FeaturedVacancies = () => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-md'>
        <h2>Vacancies</h2>
        <h2>See more</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='h-20 bg-card border rounded-lg text-center'>Full-stack developer</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Backend developer</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Flutter developer</div>
        <div className='h-20 bg-card border rounded-lg text-center'>DevOps engineer</div>
        <div className='h-20 bg-card border rounded-lg text-center'>React developer</div>
      </div>
    </div>
  );
};

export default FeaturedVacancies;
