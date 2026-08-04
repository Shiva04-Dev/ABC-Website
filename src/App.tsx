import { useRef } from 'react';
import bgVideo from './imports/ABCAI.mp4';

const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>
);

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const SmartphoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

const LaptopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
);

const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
);

const CloudUploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const actions = [
  { icon: BotIcon, label: 'Implement AI\nSolutions' },
  { icon: SettingsIcon, label: 'Automate\nMy Business' },
  { icon: LaptopIcon, label: 'Build Custom\nSoftware' },
  { icon: SmartphoneIcon, label: 'Create a\nMobile App' },
  { icon: SmartphoneIcon, label: 'Create a\nMobile App' }, // Using duplicate as in image
  { icon: CloudUploadIcon, label: 'Alquiheri\nMobile Analytics' },
  { icon: GlobeIcon, label: 'Transform My\nDigital Presence' },
  { icon: TrendingUpIcon, label: 'Grow My\nBusiness' },
];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      // Mute after the first play finishes, then replay manually
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#15171a] selection:bg-brand-emerald/30">
      
      {/* Background radial glow */}
      <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[40%] rounded-full bg-brand-emerald/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 lg:px-10">
        <div className="text-xl font-semibold tracking-tight text-white">
          AfriBiz Connect
        </div>
        
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          <a href="#" className="transition-colors hover:text-white">Premium</a>
          <a href="#" className="transition-colors hover:text-white">Futuristic</a>
          <a href="#" className="group flex items-center gap-1 transition-colors hover:text-white">
            Desktop <ChevronDownIcon className="transition-transform group-hover:rotate-180 text-neutral-500 group-hover:text-white" />
          </a>
          <a href="#" className="group flex items-center gap-1 transition-colors hover:text-white">
            Mockup <ChevronDownIcon className="transition-transform group-hover:rotate-180 text-neutral-500 group-hover:text-white" />
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5">
            Log in
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#3da48d] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#34927d]">
            Get Started <ArrowRightIcon />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="relative z-10 flex flex-1 flex-col lg:flex-row pt-24 pb-8 px-6 lg:px-8 gap-8 max-w-[1800px] mx-auto w-full">
        
        {/* Left Column: Heading */}
        <div className="flex w-full flex-col pt-10 lg:w-[28%] lg:pt-24 xl:w-[25%] shrink-0">
          <h1 className="mb-4 text-[3.5rem] leading-[1.1] font-bold tracking-tight text-white lg:text-[4rem] xl:text-[5rem]">
            AfriBiz<br />Connect
          </h1>
          <p className="max-w-xs text-lg text-neutral-400">
            Building Africa's Next Generation of Digital Businesses.
          </p>
        </div>
        
        {/* Right Column: Video & Interface Container */}
        <div className="relative flex flex-1 w-full min-h-[600px] flex-col items-center justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl lg:min-h-0 lg:h-[85vh]">
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onEnded={handleVideoEnded}
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          
          {/* Gradients to fade edges and bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e]/90 via-[#090b0e]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b0e]/50 via-transparent to-[#090b0e]/50" />

          {/* Overlay Content (AI Chat + Action Grid) */}
          <div className="relative z-10 mb-10 flex w-full max-w-4xl flex-col items-center px-4">
            {/* Actions Grid */}
            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  className="glow-btn group flex items-center gap-3 lg:gap-4 rounded-xl bg-white/5 px-4 py-3 lg:px-5 lg:py-4 text-left backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10 text-brand-emerald transition-colors duration-300 group-hover:bg-brand-emerald/20 group-hover:text-brand-emerald">
                    <action.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="whitespace-pre-line text-sm font-medium tracking-wide text-neutral-200 transition-colors group-hover:text-white leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}