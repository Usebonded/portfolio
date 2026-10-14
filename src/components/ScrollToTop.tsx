import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteSEO {
  title: string;
  description: string;
}

const ROUTE_SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'Savar Shetty — AI/ML Engineer & Systems Developer',
    description: 'Portfolio of Savar Shetty, AI/ML Engineer. Applied machine learning, multimodal reasoning, real-time fraud detection, and embedded edge IoT systems.'
  },
  '/projects': {
    title: 'Selected Projects & Case Studies — Savar Shetty',
    description: 'Explore applied machine learning architectures, financial fraud detection with ESP32 POS integration, and multimodal assistants built by Savar Shetty.'
  },
  '/systems': {
    title: 'Skills & Architectural Vision — Savar Shetty',
    description: 'Technical competencies across machine learning, deep neural ensembles, low-latency edge computing, and full-stack engineering toolkits.'
  },
  '/about': {
    title: 'My Journey · 2025 to 2029 — Savar Shetty',
    description: 'Academic background at Symbiosis Skills and Professional University, competitive hackathon sprints, engineering milestones, and career path.'
  },
  '/contact': {
    title: 'Contact & Dispatch Comms — Savar Shetty',
    description: 'Get in touch with Savar Shetty for machine learning engineering roles, AI research collaborations, and high-impact systems projects.'
  },
  '/privacy': {
    title: 'Privacy Policy — Savar Shetty Portfolio',
    description: 'Privacy policy for Savar Shetty portfolio. Details regarding confidential communication, local storage preferences, and zero ad-tracking.'
  },
  '/terms': {
    title: 'Terms of Service — Savar Shetty Portfolio',
    description: 'Terms of service and intellectual property guidelines for Savar Shetty engineering portfolio, open-source repositories, and case studies.'
  }
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Instant scroll to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Dynamic SEO title & description
    const currentSeo = ROUTE_SEO_MAP[pathname] || {
      title: '404 Page Not Found — Savar Shetty',
      description: 'The requested engineering resource or case study fragment could not be located in Savar Shetty portfolio.'
    };

    document.title = currentSeo.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.description);

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }

    // Update Twitter tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', currentSeo.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', currentSeo.description);
  }, [pathname]);

  return null;
};
