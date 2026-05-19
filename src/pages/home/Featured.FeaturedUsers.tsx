function FeaturedUsers() {
  return (
    <div className="space-y-2">
      <div className="text-md flex justify-between">
        <h2>Users</h2>
        <h2>See more</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="bg-card h-20 rounded-lg border text-center">Someone 1</div>
        <div className="bg-card h-20 rounded-lg border text-center">Someone 2</div>
        <div className="bg-card h-20 rounded-lg border text-center">Someone 3</div>
        <div className="bg-card h-20 rounded-lg border text-center">Someone 4</div>
        <div className="bg-card h-20 rounded-lg border text-center">Someone 5</div>
      </div>
    </div>
  )
}

export default FeaturedUsers
