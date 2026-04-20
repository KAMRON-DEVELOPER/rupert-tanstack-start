function FeaturedUsers() {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-md'>
        <h2>Users</h2>
        <h2>See more</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='h-20 bg-card border rounded-lg text-center'>Someone 1</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Someone 2</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Someone 3</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Someone 4</div>
        <div className='h-20 bg-card border rounded-lg text-center'>Someone 5</div>
      </div>
    </div>
  );
}

export default FeaturedUsers;
