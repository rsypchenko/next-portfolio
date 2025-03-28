export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-pulse">
      {/* Header skeleton */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="h-12 bg-foreground/10 rounded-lg w-64 mx-auto mb-6"></div>
        <div className="h-4 bg-foreground/10 rounded w-full max-w-lg mx-auto mb-3"></div>
        <div className="h-4 bg-foreground/10 rounded w-full max-w-md mx-auto mb-8"></div>
        
        {/* Filter buttons skeleton */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="h-8 bg-foreground/10 rounded-full w-20"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-24"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-16"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-28"></div>
        </div>
      </div>
      
      {/* Projects grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card rounded-xl overflow-hidden bg-card border border-border h-96">
            <div className="h-52 bg-foreground/10"></div>
            <div className="p-6">
              <div className="h-6 bg-foreground/10 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-foreground/10 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-foreground/10 rounded w-4/6 mb-6"></div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-6 bg-foreground/10 rounded-full w-16"></div>
                <div className="h-6 bg-foreground/10 rounded-full w-20"></div>
                <div className="h-6 bg-foreground/10 rounded-full w-14"></div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-5 bg-foreground/10 rounded w-24"></div>
                <div className="h-5 bg-foreground/10 rounded w-28"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}