

const HowItWorks = () => {
  return (
    <section
    
      className="bg-base-200 py-20 px-4 md:px-8 my-10" 
    >
      <div className="max-w-7xl mx-auto text-center">
      
        <h2 className="text-4xl font-extrabold text-base-content mb-4 tracking-tight">
          How It Works
        </h2>
        
      
        <p className="text-lg text-base-content/90 mb-16 max-w-3xl mx-auto">
          Renting a car with us is fast and simple. Just follow these three easy steps and hit the road!
        </p>

       
        <div className="grid gap-10 md:grid-cols-3 text-left relative before:hidden md:before:block md:before:absolute md:before:top-1/4 md:before:left-0 md:before:right-0 md:before:h-1 before:bg-primary/20 before:z-0">
          
       
          <div className="flex flex-col items-start card bg-base-100 shadow-xl border border-base-300 transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl z-10">
            <div className="card-body p-8">
              
              <div className="badge badge-primary badge-lg text-2xl w-14 h-14 flex items-center justify-center rounded-full mb-6 font-bold">
                1
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-base-content">Choose Your Car </h3>
              
              <p className="text-base-content/70 leading-relaxed">
                Browse our wide selection of vehicles to find the perfect fit for your trip or daily needs. We have everything from compact cars to luxury SUVs.
              </p>
            </div>
          </div>

         
          <div className="flex flex-col items-start card bg-base-100 shadow-xl border border-base-300 transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl z-10">
            <div className="card-body p-8">
              <div className="badge badge-primary badge-lg text-2xl w-14 h-14 flex items-center justify-center rounded-full mb-6 font-bold">
                2
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-base-content">Book Online </h3>
              
              <p className="text-base-content/70 leading-relaxed">
                Select your rental period, location, and extras. Pay securely through our easy-to-use and encrypted online booking system.
              </p>
            </div>
          </div>

         
          <div className="flex flex-col items-start card bg-base-100 shadow-xl border border-base-300 transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl z-10">
            <div className="card-body p-8">
              <div className="badge badge-primary badge-lg text-2xl w-14 h-14 flex items-center justify-center rounded-full mb-6 font-bold">
                3
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-base-content">Pick Up & Drive </h3>
              
              <p className="text-base-content/70 leading-relaxed">
                Pick up your car at your selected location after a quick check-in — and you're off! Drive safely and enjoy the journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
