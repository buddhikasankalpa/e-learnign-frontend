import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function CourseVideos() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    axios
      .get(BACKEND + "/courses/" + courseId, { headers })
      .then((res) => setCourse(res.data))
      .catch(() => {});

    axios
      .get(BACKEND + "/course-videos/course/" + courseId, { headers })
      .then((res) => {
        setVideos(res.data);
        if (res.data.length > 0) setActiveVideo(res.data[0]);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [courseId]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">

      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-4 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition"
        >
          ← Back
        </button>
        <div className="w-px h-4 bg-gray-700" />
        <span className="text-white font-bold text-sm truncate">
          {course?.title || courseId}
        </span>
        {activeVideo && (
          <>
            <div className="w-px h-4 bg-gray-700" />
            <span className="text-gray-400 text-sm truncate hidden sm:block">
              {activeVideo.title}
            </span>
          </>
        )}
      </div>

      {/* ── Main Layout ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Video Player ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeVideo ? (
            <>
              {/* Player */}
              <div className="w-full bg-black" style={{ aspectRatio: "16/9" }}>
                {activeVideo.videoUrl ? (
                  <video
                    key={activeVideo.videoId}
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    Video not available.
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6 bg-gray-900 border-t border-gray-800 flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-xl font-bold text-white mb-1">{activeVideo.title}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>⏱ {activeVideo.duration}</span>
                      {activeVideo.isPreview && (
                        <span className="bg-emerald-900/60 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                          Free Preview
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prev / Next buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const idx = videos.findIndex((v) => v.videoId === activeVideo.videoId);
                        if (idx > 0) setActiveVideo(videos[idx - 1]);
                      }}
                      disabled={videos.findIndex((v) => v.videoId === activeVideo.videoId) === 0}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => {
                        const idx = videos.findIndex((v) => v.videoId === activeVideo.videoId);
                        if (idx < videos.length - 1) setActiveVideo(videos[idx + 1]);
                      }}
                      disabled={
                        videos.findIndex((v) => v.videoId === activeVideo.videoId) ===
                        videos.length - 1
                      }
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              No videos available for this course.
            </div>
          )}
        </div>

        {/* ── Sidebar: Video List ────────────────────────────────── */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-4 border-b border-gray-800 shrink-0">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Course Content
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {videos.length} video{videos.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {videos.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No videos yet.</div>
            ) : (
              videos.map((v, i) => {
                const isActive = activeVideo?.videoId === v.videoId;
                return (
                  <button
                    key={v.videoId}
                    onClick={() => setActiveVideo(v)}
                    className={`w-full text-left px-4 py-4 border-b border-gray-800/60 flex items-start gap-3 transition-colors ${
                      isActive
                        ? "bg-blue-600/20 border-l-2 border-l-blue-500"
                        : "hover:bg-gray-800 border-l-2 border-l-transparent"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {isActive ? "▶" : i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium leading-snug ${
                          isActive ? "text-blue-400" : "text-gray-200"
                        }`}
                      >
                        {v.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-gray-500">⏱ {v.duration}</span>
                        {v.isPreview && (
                          <span className="text-xs bg-emerald-900/50 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const BACKEND = import.meta.env.VITE_BACKEND_URL;

// function getYouTubeId(url) {
//   if (!url) return null;
//   const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/\s]{6,})/);
//   if (match) return match[1];
//   if (/^[a-zA-Z0-9_-]{6,15}$/.test(url.trim())) return url.trim();
//   return null;
// }

// export default function CourseVideos() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const [course, setCourse] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [loaded, setLoaded] = useState(false);

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   useEffect(() => {
//     // Fetch course info
//     axios
//       .get(BACKEND + "/courses/" + courseId, { headers })
//       .then((res) => setCourse(res.data))
//       .catch(() => {});

//     // Fetch videos for this course
//     axios
//       .get(BACKEND + "/course-videos/course/" + courseId, { headers })
//       .then((res) => {
//         setVideos(res.data);
//         if (res.data.length > 0) setActiveVideo(res.data[0]);
//         setLoaded(true);
//       })
//       .catch(() => setLoaded(true));
//   }, [courseId]);

//   if (!loaded) {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//           <p className="text-gray-400 text-sm">Loading course...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">

//       {/* ── Top Bar ─────────────────────────────────────────────── */}
//       <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-4 shrink-0">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition"
//         >
//           ← Back
//         </button>
//         <div className="w-px h-4 bg-gray-700" />
//         <span className="text-white font-bold text-sm truncate">
//           {course?.title || courseId}
//         </span>
//         {activeVideo && (
//           <>
//             <div className="w-px h-4 bg-gray-700" />
//             <span className="text-gray-400 text-sm truncate hidden sm:block">
//               {activeVideo.title}
//             </span>
//           </>
//         )}
//       </div>

//       {/* ── Main Layout ─────────────────────────────────────────── */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* ── Video Player ──────────────────────────────────────── */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {activeVideo ? (
//             <>
//               {/* Player */}
//               <div className="w-full bg-black" style={{ aspectRatio: "16/9" }}>
//                 {getYouTubeId(activeVideo.videoUrl) ? (
//                   <iframe
//                     key={activeVideo.videoId}
//                     src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.videoUrl)}?autoplay=1&rel=0&modestbranding=1`}
//                     className="w-full h-full"
//                     allow="autoplay; fullscreen; picture-in-picture"
//                     allowFullScreen
//                     title={activeVideo.title}
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
//                     Invalid video URL
//                   </div>
//                 )}
//               </div>

//               {/* Video Info */}
//               <div className="p-6 bg-gray-900 border-t border-gray-800 flex-1">
//                 <div className="flex items-start justify-between gap-4 flex-wrap">
//                   <div>
//                     <h1 className="text-xl font-bold text-white mb-1">{activeVideo.title}</h1>
//                     <div className="flex items-center gap-3 text-sm text-gray-400">
//                       <span>⏱ {activeVideo.duration}</span>
//                       {activeVideo.isPreview && (
//                         <span className="bg-emerald-900/60 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
//                           Free Preview
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Prev / Next buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         const idx = videos.findIndex((v) => v.videoId === activeVideo.videoId);
//                         if (idx > 0) setActiveVideo(videos[idx - 1]);
//                       }}
//                       disabled={videos.findIndex((v) => v.videoId === activeVideo.videoId) === 0}
//                       className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition"
//                     >
//                       ← Prev
//                     </button>
//                     <button
//                       onClick={() => {
//                         const idx = videos.findIndex((v) => v.videoId === activeVideo.videoId);
//                         if (idx < videos.length - 1) setActiveVideo(videos[idx + 1]);
//                       }}
//                       disabled={
//                         videos.findIndex((v) => v.videoId === activeVideo.videoId) ===
//                         videos.length - 1
//                       }
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition"
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
//               No videos available for this course.
//             </div>
//           )}
//         </div>

//         {/* ── Sidebar: Video List ────────────────────────────────── */}
//         <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden shrink-0">
//           <div className="px-4 py-4 border-b border-gray-800 shrink-0">
//             <h2 className="text-sm font-bold text-white uppercase tracking-wider">
//               Course Content
//             </h2>
//             <p className="text-xs text-gray-500 mt-0.5">
//               {videos.length} video{videos.length !== 1 ? "s" : ""}
//             </p>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {videos.length === 0 ? (
//               <div className="p-6 text-center text-gray-500 text-sm">No videos yet.</div>
//             ) : (
//               videos.map((v, i) => {
//                 const isActive = activeVideo?.videoId === v.videoId;
//                 return (
//                   <button
//                     key={v.videoId}
//                     onClick={() => setActiveVideo(v)}
//                     className={`w-full text-left px-4 py-4 border-b border-gray-800/60 flex items-start gap-3 transition-colors ${
//                       isActive
//                         ? "bg-blue-600/20 border-l-2 border-l-blue-500"
//                         : "hover:bg-gray-800 border-l-2 border-l-transparent"
//                     }`}
//                   >
//                     {/* Number / play indicator */}
//                     <span
//                       className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
//                         isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
//                       }`}
//                     >
//                       {isActive ? "▶" : i + 1}
//                     </span>

//                     <div className="flex-1 min-w-0">
//                       <p
//                         className={`text-sm font-medium leading-snug ${
//                           isActive ? "text-blue-400" : "text-gray-200"
//                         }`}
//                       >
//                         {v.title}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1 flex-wrap">
//                         <span className="text-xs text-gray-500">⏱ {v.duration}</span>
//                         {v.isPreview && (
//                           <span className="text-xs bg-emerald-900/50 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
//                             Free
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
