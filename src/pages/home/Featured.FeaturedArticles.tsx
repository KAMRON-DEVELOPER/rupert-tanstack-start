const FeaturedArticles = () => {
  return (
    <div className="space-y-2">
      <div className="text-md flex justify-between">
        <h2>Articles</h2>
        <h2>See more</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="bg-card h-20 rounded-lg border text-center">How SSR work?</div>
        <div className="bg-card h-20 rounded-lg border text-center">What is hydration?</div>
        <div className="bg-card h-20 rounded-lg border text-center">
          Fearless concurrency in Rust
        </div>
        <div className="bg-card h-20 rounded-lg border text-center">Go corutines</div>
        <div className="bg-card h-20 rounded-lg border text-center">OOP</div>
      </div>
    </div>
  )
}

export default FeaturedArticles
