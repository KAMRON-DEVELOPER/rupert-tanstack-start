const FeaturedCompanies = () => {
  return (
    <div className="space-y-2">
      <div className="text-md flex justify-between">
        <h2>Companies</h2>
        <h2>See more</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="bg-card h-20 rounded-lg border text-center">Exadel</div>
        <div className="bg-card h-20 rounded-lg border text-center">Uzum</div>
        <div className="bg-card h-20 rounded-lg border text-center">Epam</div>
        <div className="bg-card h-20 rounded-lg border text-center">Mohirdev</div>
        <div className="bg-card h-20 rounded-lg border text-center">Poddle</div>
      </div>
    </div>
  )
}

export default FeaturedCompanies
