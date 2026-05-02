import { useNavigate } from "react-router-dom";

export default function AboutUsPage() {

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/categories"); 
  };

  const stats = [
    { num: "10K+", label: "Students Worldwide" },
    { num: "4.9/5", label: "Average Rating" },
    { num: "95%", label: "Hire Rate" },
  ];

  const missions = [
    {
      title: "Curated Curriculum",
      desc: "Every program is hand-crafted by industry experts with decades of real-world experience.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 text-white" viewBox="0 0 24 24">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      title: "High-Fidelity Instruction",
      desc: "We hold our instructors to the highest standards — every lesson must elevate the craft.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 text-white" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      title: "Community First",
      desc: "From Silicon Valley to London, our learners define the digital economy together.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 text-white" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      title: "Career Outcomes",
      desc: "95% of our graduates secure roles in their target industry within 6 months.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 text-white" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  const team = [
    {
      initials: "DP",
      name: "Daniel Perera",
      role: "MERN developer",
      tag: "DEVELOPMENT",
      bio: "specializes in building end-to-end web applications using JavaScript",
      students: 100,
      courses: 10,
      rating: 5,
      image: "https://rlawualidanksomoidky.supabase.co/storage/v1/object/public/Images/teachers/1.jpg",
      avatarBg: "bg-blue-100",
      avatarColor: "text-blue-700",
      tagColor: "bg-blue-600",
    },
    {
      initials: "KF",
      name: "Kavindi Fernando",
      role: "UI/UX developer",
      tag: "DESIGN",
      bio: "creates intuitive, visually appealing digital interfaces by combining user research, wireframing...",
      students: 90,
      courses: 6,
      rating: 4.8,
      image: "https://rlawualidanksomoidky.supabase.co/storage/v1/object/public/Images/teachers/2.jpg",
      avatarBg: "bg-blue-100",
      avatarColor: "text-blue-700",
      tagColor: "bg-blue-600",
    },
    {
      initials: "MS",
      name: "Michael Silva",
      role: "Python for Data Science",
      tag: "DEVELOPMENT",
      bio: "Learn Python programming and data analysis with real-world projects.",
      students: 200,
      courses: 20,
      rating: 5,
      image: "https://rlawualidanksomoidky.supabase.co/storage/v1/object/public/Images/teachers/3.avif",
      avatarBg: "bg-blue-100",
      avatarColor: "text-blue-700",
      tagColor: "bg-blue-600",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f9f9f9]">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 w-full">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] rounded-[32px] px-8 py-16 md:px-16 md:py-20 shadow-lg">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 right-32 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              About Scholarly
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
              Built by craftsmen<br />for digital masters.
            </h1>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              Our faculty aren't just teachers — they are practitioners at the pinnacle of their craft, shaping the next generation of industry leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((st) => (
            <div key={st.label} className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold text-blue-600 tracking-tight mb-2">{st.num}</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1.5 w-8 bg-blue-600 rounded-full"></div>
          <span className="text-blue-600 font-bold uppercase tracking-[0.15em] text-xs">Our Mission</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Master In-Demand Industrial Skills</h2>
        <p className="text-slate-600 text-lg max-w-3xl mb-12 leading-relaxed">
          Scholarly was founded on a simple belief: the gap between learning and mastery shouldn't exist. We build precision-engineered paths that turn aspiration into expertise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((m) => (
            <div key={m.title} className="bg-white border border-slate-200 rounded-[24px] p-6 flex flex-col sm:flex-row gap-5 items-start shadow-sm hover:border-blue-200 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                {m.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h3>
                <p className="text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team (Matches Instructor Cards UI) */}
      <div className="w-full bg-gradient-to-b from-transparent to-slate-100/50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1.5 w-8 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-bold uppercase tracking-[0.15em] text-xs">Expert-Led Faculty</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 tracking-tight">Meet Our Instructors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {/* Render the image if available, else render initials */}
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-6xl font-black ${t.avatarBg} ${t.avatarColor} opacity-50`}>
                      {t.initials}
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 ${t.tagColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm`}>
                    {t.tag}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-500 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    ★ {t.rating}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-6 h-6 rounded-full ${t.avatarBg} ${t.avatarColor} flex items-center justify-center text-[10px] font-bold`}>
                      {t.initials[0]}
                    </div>
                    <span className="text-sm font-semibold text-slate-500">{t.role}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3">
                    {t.bio}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Students</div>
                        <div className="text-base font-extrabold text-slate-900">{t.students}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Courses</div>
                        <div className="text-base font-extrabold text-slate-900">{t.courses}</div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                      View Courses
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full">
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to master your craft?</h2>
            <p className="text-blue-100 text-lg">Join 10,000+ students worldwide who are building the skills that define the digital economy.</p>
          </div>
          <button 
            onClick={handleExploreClick} 
            className="cursor-pointer whitespace-nowrap bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Explore Courses →
          </button>
        </div>
      </div>
    </div>
  );
}