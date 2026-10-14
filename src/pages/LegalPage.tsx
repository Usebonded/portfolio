import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-6 text-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono-code text-white mb-6">
        <Link to="/" className="hover:text-[#00FF66] transition-colors">HOME</Link>
        <span>/</span>
        <span className="text-[#7C7CFF]">{isPrivacy ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}</span>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#7C7CFF]">
            {isPrivacy ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bricolage font-bold text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h1>
            <p className="text-xs font-mono-code text-white mt-1">
              Effective Date: September 2026 · Savar Shetty Portfolio
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-white leading-relaxed font-light">
          {isPrivacy ? (
            <>
              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">1. Information Collection</h2>
                <p>
                  When you submit the contact transmission form, the details you provide (Full Name, Email address, Subject, and Message Body) are strictly utilized to communicate regarding engineering opportunities, recruitment, or hackathon collaboration. No data is ever sold or transferred to advertising entities.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">2. Local Storage &amp; Cookies</h2>
                <p>
                  This portfolio does not utilize tracking cookies, marketing beacons, or invasive fingerprinting scripts. Local storage is strictly utilized on your client device to remember your interface preferences (e.g., Light/Dark theme configuration).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">3. Direct Data Deletion Inquiries</h2>
                <p>
                  You may request the immediate deletion of any submitted messages or transcripts by contacting Savar directly at{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#7C7CFF] underline underline-offset-4">
                    {PERSONAL_INFO.email}
                  </a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">1. Intellectual Property &amp; Open Source</h2>
                <p>
                  All project case studies, system architecture diagrams, and editorial materials published on this website are authored by Savar Shetty. Associated software code repositories on GitHub are licensed under their respective open-source licenses (MIT, Apache 2.0).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">2. Permitted Use</h2>
                <p>
                  Visitors, recruiters, and engineering teams are welcome to review project architectures, inspect public GitHub repositories via linked sources, and dispatch professional inquiries through the provided channels.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bricolage font-semibold text-white mb-2">3. Disclaimer</h2>
                <p>
                  Throughput metrics, latency benchmarks, and accuracy statistics reported in case studies are recorded under authentic testing environments and benchmark datasets described in project specifications.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono-code text-white hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Home</span>
          </Link>
          <span className="text-xs font-mono-code text-white">
            SS // 2026.9 Active
          </span>
        </div>
      </div>
    </div>
  );
};
