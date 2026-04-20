const FeaturedArticles = () => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-md'>
        <h2>Articles</h2>
        <h2>See more</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='h-20 bg-card border rounded-lg text-center'>How SSR work?</div>
        <div className='h-20 bg-card border rounded-lg text-center'>What is hydration?</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Fearless concurrency in Rust</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Go corutines</div>
        <div className='h-20 bg-card border rounded-lg text-center'>OOP</div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
