export default function ProjectDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-pulse">
      {/* Back to projects link skeleton */}
      <div className="mb-8">
        <div className="h-4 bg-foreground/10 rounded w-32"></div>
      </div>
      
      {/* Project header skeleton */}
      <div className="mb-12">
        <div className="h-10 bg-foreground/10 rounded-lg w-96 max-w-full mb-4"></div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-8 bg-foreground/10 rounded-full w-24"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-32"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-28"></div>
          <div className="h-8 bg-foreground/10 rounded-full w-20"></div>
        </div>
      </div>
      
      {/* Project image skeleton */}
      <div className="rounded-xl overflow-hidden mb-12 bg-foreground/10 h-[400px] md:h-[500px]"></div>
      
      {/* Project content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="h-8 bg-foreground/10 rounded w-48 mb-4"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-5/6 mb-8"></div>
          
          <div className="h-8 bg-foreground/10 rounded w-40 mb-4"></div>
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-foreground/10 rounded w-full"></div>
            <div className="h-4 bg-foreground/10 rounded w-full"></div>
            <div className="h-4 bg-foreground/10 rounded w-full"></div>
            <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
            <div className="h-4 bg-foreground/10 rounded w-4/6"></div>
          </div>
          
          <div className="h-8 bg-foreground/10 rounded w-52 mb-4"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-5/6 mb-8"></div>
          
          <div className="h-8 bg-foreground/10 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg border border-border h-40"></div>
            <div className="p-4 rounded-lg border border-border h-40"></div>
            <div className="p-4 rounded-lg border border-border h-40"></div>
            <div className="p-4 rounded-lg border border-border h-40"></div>
          </div>
        </div>
        
        {/* Project sidebar skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card rounded-xl border border-border p-6 mb-8">
              <div className="h-6 bg-foreground/10 rounded w-36 mb-6"></div>
              
              <div className="space-y-5">
                <div>
                  <div className="h-4 bg-foreground/10 rounded w-16 mb-2"></div>
                  <div className="h-5 bg-foreground/10 rounded w-40"></div>
                </div>
                
                <div>
                  <div className="h-4 bg-foreground/10 rounded w-20 mb-2"></div>
                  <div className="h-5 bg-foreground/10 rounded w-36"></div>
                </div>
                
                <div>
                  <div className="h-4 bg-foreground/10 rounded w-14 mb-2"></div>
                  <div className="h-5 bg-foreground/10 rounded w-32"></div>
                </div>
                
                <div className="pt-4 flex flex-col gap-3">
                  <div className="h-10 bg-foreground/10 rounded-lg w-full"></div>
                  <div className="h-10 bg-foreground/10 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related projects skeleton */}
      <div className="mt-20">
        <div className="h-8 bg-foreground/10 rounded w-48 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card rounded-xl overflow-hidden bg-card border border-border">
              <div className="h-48 bg-foreground/10"></div>
              <div className="p-4">
                <div className="h-6 bg-foreground/10 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}