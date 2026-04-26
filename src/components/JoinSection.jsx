import { useNavigate } from 'react-router-dom';

export default function JoinSection() {
  const navigate = useNavigate();

  const courses = [
    {
      label: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      search: 'web development',
      rotate: '-rotate-12',
      position: 'top-0 -left-16 z-10',
      size: 'w-72 h-44', 
    },
    {
      label: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      search: 'data science',
      rotate: '-rotate-2',
      position: 'top-10 left-4 z-20',
      size: 'w-72 h-44', 
    },
    {
      label: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      search: 'ui ux',
      rotate: 'rotate-12',
      position: 'top-20 left-24 z-30', 
      size: 'w-72 h-44',
    },
  ];

  return (
    <div className="px-6 py-10 md:px-12 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-[3rem] p-10 md:p-16 text-white flex flex-col lg:flex-row justify-between items-center gap-16 shadow-2xl overflow-hidden border border-white/10">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Community</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Join a community of <br/> digital craftsmen.
          </h2>
          <p className="text-blue-100/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
            From Silicon Valley to London, our students are defining the future of the digital economy.
          </p>

          <button
            onClick={() => navigate('/categories')}
            className="px-10 py-4 bg-white text-blue-800 font-extrabold text-lg rounded-full shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 mb-12 cursor-pointer"
          >
            Explore Courses
          </button>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-10">
            {[
              { value: '10K+', label: 'Students' },
              { value: '4.9/5', label: 'Rating' },
              { value: '95%', label: 'Hire Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-left border-l border-white/20 pl-6 first:border-0 first:pl-0">
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-blue-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Widened Stacked Cards */}
        <div className="relative w-full lg:w-1/2 h-[450px] flex items-center justify-center mt-12 lg:mt-0">
          <div className="relative w-[450px] h-full"> 
            {courses.map((course, i) => (
              <div
                key={i}
                onClick={() => navigate(`/categories?search=${encodeURIComponent(course.search)}`)}
                className={`absolute ${course.position} ${course.size} ${course.rotate} 
                rounded-[2rem] overflow-hidden border-4 border-white/20 cursor-pointer 
                hover:scale-105 hover:z-50 hover:rotate-0 transition-all duration-500 
                shadow-2xl group`}
              >
                <img
                  src={course.image}
                  alt={course.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white text-base font-bold tracking-wide">{course.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}