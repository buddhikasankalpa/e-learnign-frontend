import { useNavigate } from "react-router-dom";

export default function PrivacyPolicyPage() {

    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate("/contact"); 
    };


  const sections = [
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
      title: "Information We Collect",
      content: "We collect information you provide directly to us — such as your name, email address, and payment details when you register or purchase a course. We also automatically collect usage data, device information, and cookies to improve your experience on the platform.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
      title: "How We Use Your Information",
      content: "We use collected information to provide, maintain, and improve our services; process transactions; send you updates and marketing communications (which you can opt out of at any time); and to comply with legal obligations. We do not sell your personal data to third parties.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
      title: "Information Sharing",
      content: "We may share your information with trusted service providers who assist us in operating the platform (e.g., payment processors, email providers). All third parties are contractually obligated to keep your data secure and use it only for the services they provide to us.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
      title: "Data Security",
      content: "We implement industry-standard security measures including encryption, secure servers, and regular audits to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data at any time. You may also request a copy of the data we hold about you or ask us to restrict its processing. To exercise these rights, contact us at privacy@scholarly.com.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
      title: "Cookies",
      content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser. Disabling cookies may affect certain features of the platform.",
    },
    {
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy periodically. When we do, we will revise the 'last updated' date at the top of this page and notify you via email or a notice on our platform. We encourage you to review this policy regularly to stay informed.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f9f9f9]">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 w-full">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 rounded-[32px] px-8 py-16 md:px-16 md:py-20 shadow-md">
          <div className="absolute -top-24 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Privacy Policy</h1>
            <p className="text-white/70 font-medium text-sm">Last updated: May 2, 2026</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full">
        {/* Intro */}
        <div className="bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-2xl p-8 mb-10 shadow-sm">
          <p className="text-slate-700 text-lg leading-relaxed">
            At <strong className="text-slate-900 font-bold">Scholarly</strong>, your privacy is a priority. This policy explains what data we collect, how we use it, and what rights you have. We are committed to being transparent and keeping your information safe.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                {sec.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{sec.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-[24px] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Privacy concerns?</h3>
            <p className="text-blue-100">Contact our data protection team at privacy@scholarly.com</p>
          </div>
          
          <button 
            onClick={handleExploreClick} 
            className="whitespace-nowrap bg-white text-blue-700 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );
}