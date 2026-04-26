import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center overflow-hidden p-8">
      
      {/* Background circles */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-blue-100 -top-48 -left-36 animate-spin" style={{animationDuration:'30s'}}></div>
      <div className="absolute w-[400px] h-[400px] rounded-full border border-blue-200 -bottom-28 -right-24 animate-spin" style={{animationDuration:'20s', animationDirection:'reverse'}}></div>

      <div className="relative z-10 text-center max-w-lg">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Page Not Found
        </div>

        {/* 404 + Globe */}
        <div className="relative inline-block mb-4">
          <h1 className="text-[10rem] md:text-[13rem] font-extrabold text-slate-100 leading-none select-none tracking-tight" style={{fontFamily:'system-ui'}}>
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg className="animate-bounce" width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="30" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
              <ellipse cx="36" cy="36" rx="14" ry="30" fill="none" stroke="#60a5fa" strokeWidth="1.2"/>
              <ellipse cx="36" cy="36" rx="30" ry="10" fill="none" stroke="#60a5fa" strokeWidth="1.2"/>
              <circle cx="36" cy="36" r="5" fill="#2563eb" opacity="0.7"/>
              <circle cx="36" cy="36" r="2.5" fill="#1d4ed8"/>
            </svg>
            <div className="w-14 h-2 bg-slate-200 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Seems you've{' '}
          <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            lost the path.
          </span>
        </h2>
        <p className="text-slate-500 text-base leading-relaxed mb-10">
          The learning path has taken an unexpected turn.<br />
          The curriculum you're seeking isn't here.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-7 py-3 bg-blue-700 text-white font-medium rounded-full hover:bg-blue-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-200"
          >
            Back to Courses
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link
            to="/courses"
            className="px-7 py-3 bg-white text-blue-700 font-medium rounded-full border-2 border-blue-200 hover:bg-blue-50 transition-all hover:-translate-y-0.5"
          >
            Browse Courses
          </Link>
        </div>

        {/* Dots */}
        <div className="flex gap-2 justify-center mt-8">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{animationDelay:'0s'}}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce" style={{animationDelay:'0.2s'}}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay:'0.4s'}}></span>
        </div>
      </div>
    </div>
  );
}