import { useNavigate } from 'react-router-dom';
export default function HeroSection(){

  const navigate = useNavigate();

    return(
        
      <section className="relative pt-14 pb-14 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-bold tracking-wide uppercase">Join 10,000+ Students Worldwide</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 text-gray-900">
              Learn New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Skills</span> Online.
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
              Experience a curated digital atelier where mastery is the standard. Elevate your craft through high-fidelity instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl max-w-lg">
              <div className="flex-grow flex items-center px-4 gap-3">
                <input className="w-full border-none outline-none text-gray-900" placeholder="What would you like to master?" type="text" />
              </div>
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/categories')}
              >
                Explore Courses
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                alt="Education Workspace"
                className="w-full h-[550px] object-cover"
                src="heroSection.png"
              />
            </div>
          </div>
        </div>
      </section>
    )
}
