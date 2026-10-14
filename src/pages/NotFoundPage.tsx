import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 text-[#E8E8E8]">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-12 border border-white/[0.12] bg-[#101010]">
        <div className="font-anton text-7xl text-white tracking-tight leading-none">
          404
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">
            ROUTE NOT FOUND
          </span>
          <h1 className="text-2xl font-anton uppercase tracking-tight text-white mt-2">
            RESOURCE OUT OF BOUNDS
          </h1>
          <p className="text-xs font-mono text-[#888888] mt-3 leading-relaxed">
            The destination or case study fragment you requested does not exist or has been relocated within Savar Shetty&apos;s architectural index.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 hover:bg-[#E8E8E8]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
