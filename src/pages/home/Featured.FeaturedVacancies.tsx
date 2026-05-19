const FeaturedVacancies = () => {
  return (
    <div className="space-y-2">
      <div className="text-md flex justify-between">
        <h2>Vacancies</h2>
        <h2>See more</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="bg-card h-20 rounded-lg border text-center">Full-stack developer</div>
        <div className="bg-card h-20 rounded-lg border text-center">Backend developer</div>
        <div className="bg-card h-20 rounded-lg border text-center">Flutter developer</div>
        <div className="bg-card h-20 rounded-lg border text-center">DevOps engineer</div>
        <div className="bg-card h-20 rounded-lg border text-center">React developer</div>
      </div>
    </div>
  )
}

export default FeaturedVacancies
