const FeaturedCompanies = () => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-md'>
        <h2>Companies</h2>
        <h2>See more</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='h-20 bg-card border rounded-lg text-center'>Exadel</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Uzum</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Epam</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Mohirdev</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Poddle</div>
      </div>
    </div>
  );
};

export default FeaturedCompanies;
