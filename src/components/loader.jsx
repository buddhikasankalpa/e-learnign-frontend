export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex flex-col justify-center items-center gap-6">
      
      <div className="relative w-24 h-24 flex justify-center items-center">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>

        {/* Outer Static Ring */}
        <div className="absolute w-full h-full border-4 border-gray-100 rounded-full"></div>
        
        {/* Outer Spinning Ring (Blue 600) */}
        <div className="absolute w-full h-full border-4 border-blue-600 border-t-transparent border-r-transparent rounded-full animate-spin"></div>

        {/* Inner Spinning Ring (Blue 400 - Spins opposite) */}
        <div className="absolute w-16 h-16 border-4 border-blue-400 border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_reverse_infinite]"></div>

        {/* Center Pulsing Dot */}
        <div className="w-5 h-5 bg-blue-600 rounded-full shadow-lg shadow-blue-600/50 animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <p className="text-slate-500 font-bold tracking-[0.2em] text-sm uppercase animate-pulse">
        Loading...
      </p>

    </div>
  );
}