import { useNavigate } from "react-router-dom";

export default function TermsServicePage() {

    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate("/contact"); 
    };
    
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using Scholarly's platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, students, instructors, and others who access or use the platform.",
    },
    {
      title: "2. Use of the Platform",
      content: "You agree to use Scholarly solely for lawful purposes and in a manner that does not infringe the rights of others. You must not use the platform to distribute harmful content, engage in fraudulent activity, or attempt to gain unauthorized access to any part of our systems.",
    },
    {
      title: "3. Account Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account credentials. All activities that occur under your account are your responsibility. Notify us immediately at support@scholarly.com if you suspect any unauthorized use of your account.",
    },
    {
      title: "4. Intellectual Property",
      content: "All content on Scholarly — including course materials, videos, graphics, and text — is the intellectual property of Scholarly or its instructors. You may not reproduce, distribute, or create derivative works from any content without explicit written permission.",
    },
    {
      title: "5. Payments & Refunds",
      content: "Course purchases are subject to our refund policy. Refund requests must be submitted within 7 days of purchase, provided you have not completed more than 20% of the course. Scholarly reserves the right to deny refund requests that do not meet these criteria.",
    },
    {
      title: "6. Termination",
      content: "Scholarly reserves the right to suspend or terminate your account at any time if you violate these terms. Upon termination, your access to purchased courses may be revoked. You may also terminate your account at any time by contacting our support team.",
    },
    {
      title: "7. Limitation of Liability",
      content: "Scholarly is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability to you shall not exceed the amount you paid to Scholarly in the 12 months preceding the claim.",
    },
    {
      title: "8. Changes to Terms",
      content: "We may update these Terms of Service from time to time. We will notify you of significant changes via email or a prominent notice on the platform. Continued use of Scholarly after changes constitutes acceptance of the new terms.",
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Terms of Service</h1>
            <p className="text-white/70 font-medium text-sm">Last updated: May 2, 2026</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full">
        {/* Info bar */}
        <div className="flex flex-wrap gap-6 bg-white border border-slate-200 rounded-2xl p-6 mb-10 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
            </div>
            Effective: May 2, 2026
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            8 Sections
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            Scholarly Atelier · All Rights Reserved
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="flex items-center gap-4 text-xl font-bold text-slate-900 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                {sec.title.replace(/^\d+\.\s/, "")}
              </h2>
              <p className="text-slate-600 leading-relaxed pl-12">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-600 rounded-[24px] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Questions about these terms?</h3>
            <p className="text-blue-100">Our support team is happy to clarify anything.</p>
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