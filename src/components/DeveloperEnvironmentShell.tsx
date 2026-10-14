import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Copy, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { TextContrastZone } from './TextContrastZone';

interface HistoryItem {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  lines?: string[];
  command?: string;
}

const GREETING_LINES = [
  'hello visitor',
  'welcome to my portfolio',
  'how may i help you?'
];

export const DeveloperEnvironmentShell: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  // Typewriter state
  const [greetingProgress, setGreetingProgress] = useState<string[]>(['', '', '']);
  const [activeTypingLine, setActiveTypingLine] = useState<number>(0);
  const [isTypingGreeting, setIsTypingGreeting] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll viewport reveal animation
  const [isVisible, setIsVisible] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Core Typewriter Engine (runs on mount and on every refresh/reset)
  const startTypewriter = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsTypingGreeting(true);
    setGreetingProgress(['', '', '']);
    setActiveTypingLine(0);
    setHistory([]);
    setInputVal('');

    let lineIdx = 0;
    let charIdx = 0;
    const progress = ['', '', ''];

    const typeNextChar = () => {
      if (lineIdx < GREETING_LINES.length) {
        const fullLine = GREETING_LINES[lineIdx];
        if (charIdx < fullLine.length) {
          charIdx++;
          progress[lineIdx] = fullLine.slice(0, charIdx);
          setGreetingProgress([...progress]);
          setActiveTypingLine(lineIdx);
          // Human-like typewriter cadence (35ms per character)
          timerRef.current = setTimeout(typeNextChar, 35);
        } else {
          // Line complete: pause before starting the next line
          lineIdx++;
          charIdx = 0;
          if (lineIdx < GREETING_LINES.length) {
            setActiveTypingLine(lineIdx);
            timerRef.current = setTimeout(typeNextChar, 220);
          } else {
            // All greeting lines complete
            setActiveTypingLine(GREETING_LINES.length);
            timerRef.current = setTimeout(() => {
              setIsTypingGreeting(false);
              inputRef.current?.focus();
            }, 250);
          }
        }
      }
    };

    // Initial small pause on start/refresh
    timerRef.current = setTimeout(typeNextChar, 180);
  }, []);

  // Trigger typewriter on initial load (website refresh)
  useEffect(() => {
    startTypewriter();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTypewriter]);

  // Auto-scroll terminal to bottom when new history is appended
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isTypingGreeting, greetingProgress]);

  // Focus terminal input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCopyHistory = async () => {
    try {
      const greetingText = GREETING_LINES.map((l) => `# ${l}`).join('\n');
      const commandsText = history
        .map((h) => {
          if (h.type === 'command') return `guest@savar-shetty:~$ ${h.command}`;
          if (h.lines) return h.lines.join('\n');
          return '';
        })
        .filter(Boolean)
        .join('\n');

      const plainText = commandsText ? `${greetingText}\n${commandsText}` : greetingText;

      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const resetTerminal = () => {
    startTypewriter();
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add command to history
    const cmdId = Date.now().toString();
    const newItems: HistoryItem[] = [
      ...history,
      { id: `cmd-${cmdId}`, type: 'command', command: trimmed }
    ];

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    const args = lower.split(' ');
    const mainCmd = args[0];

    switch (mainCmd) {
      case 'help':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'AVAILABLE SYSTEM PROTOCOLS:',
            '  projects     List featured engineering builds (A.R.G.U.S., MMA, V.A.L.I.D.)',
            '  skills       Display technical competencies & ML architectures',
            '  about        Print developer bio, university status & background',
            '  contact      Show verified communication channels & email',
            '  specs        Display skills and engineering vision benchmarks',
            '  whoami       Identify active user identity & security privileges',
            '  date         Print current UTC and local station time',
            '  neofetch     Display system hardware diagnostics & telemetry',
            '  clear        Wipe terminal screen and return to standard greeting'
          ]
        });
        break;

      case 'projects':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'INDEXED ENGINEERING BUILDS:',
            '  [01] A.R.G.U.S. — IoT POS Anomaly Detection (<95ms, ESP32, XGBoost)',
            '  [02] MMA — Multi-Modal Assistant Core (Whisper Stream + AST sandbox)',
            '  [03] V.A.L.I.D. — Synthetic Voice Forensics (Smart India Hackathon 2026)',
            '  [04] MeshRoute Ops — Decentralized Disaster Logistics (Google Synapse)',
            '  [05] SentinelTrade — Low-Latency Autonomous Quantitative Trading',
            'Type "help" for additional diagnostics.'
          ]
        });
        break;

      case 'skills':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'CORE TECHNICAL CAPABILITIES:',
            '  • Machine Learning: PyTorch, TensorFlow, Scikit-learn, XGBoost, Isolation Forests',
            '  • Computer Vision:  OpenCV, YOLOv8, CNNs, Image Segmentation, Spectral Analysis',
            '  • Systems & IoT:    ESP32 POS, C/C++, Embedded Sensors, Hardware Forensics',
            '  • Web & Edge:       React, TypeScript, Node.js, Fastify, Docker, Linux/POSIX'
          ]
        });
        break;

      case 'about':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            `IDENT: ${PERSONAL_INFO.name}`,
            `ROLE:  ${PERSONAL_INFO.title}`,
            `FOCUS: ${PERSONAL_INFO.tagline}`,
            `BASE:  ${PERSONAL_INFO.location}`,
            `AVAIL: ${PERSONAL_INFO.availability}`
          ]
        });
        break;

      case 'contact':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'COMMUNICATION DISPATCH:',
            `  • Email:    ${PERSONAL_INFO.email}`,
            `  • Phone:    ${PERSONAL_INFO.phone}`,
            `  • GitHub:   ${PERSONAL_INFO.github}`,
            `  • LinkedIn: ${PERSONAL_INFO.linkedin}`
          ]
        });
        break;

      case 'specs':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'HULL INTEGRITY & LATENCY TELEMETRY:',
            '  • A.R.G.U.S. Engine:  <95ms P99 Latency | 98.6% Detection SLA',
            '  • Voice Forensics:    <3.0s Forensic Window | 96.2% Precision',
            '  • Background Engine:  Three.js WebGL GPU Particle Universe (700K Nodes)',
            '  • Frame Target:       60.0 FPS Fixed Hardware Refresh'
          ]
        });
        break;

      case 'whoami':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            'guest@savar-shetty (Permissions: Read-Only Station Access)',
            'Network State: Connected // Protocol: TLSv1.3 Encrypted'
          ]
        });
        break;

      case 'date':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [new Date().toUTCString()]
        });
        break;

      case 'neofetch':
        newItems.push({
          id: `out-${cmdId}`,
          type: 'output',
          lines: [
            '       /\\          guest@savar-shetty',
            '      /  \\         ------------------',
            '     /\\   \\        OS: Aether Arch Linux x86_64',
            '    /      \\       Kernel: 6.12.0-savar-ai',
            '   /   ,,   \\      Shell: zsh 5.9',
            '  /   |  |  -\\     DE: Arctic Indigo 3D (180° Gradient)',
            ' /_-*\'    \'*-_\\    Terminal: DevEnvironmentShell v2.4',
            '                   CPU: ESP32 Dual-Core Xtensa + Apple M-Series',
            '                   GPU: WebGL 2.0 (700K Particle Shaders)',
            '                   Memory: 16384MB / 65536MB'
          ]
        });
        break;

      case 'clear':
        resetTerminal();
        return;

      default:
        newItems.push({
          id: `err-${cmdId}`,
          type: 'error',
          lines: [
            `zsh: command not found: ${trimmed}`,
            'Type "help" for a list of authorized protocols.'
          ]
        });
        break;
    }

    setHistory(newItems);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  // Quick action suggestion chips
  const quickActions = ['help', 'projects', 'skills', 'about', 'contact', 'clear'];

  return (
    <div
      id="terminal"
      ref={shellRef}
      className={`pt-10 md:pt-16 pb-8 md:pb-12 bg-transparent relative overflow-hidden text-white w-full transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Background Matrix/Code Streams (Faithful to Reference Image) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25 font-mono-code text-[11px] leading-5 text-cyan-300/60 z-0">
        {/* Stream 1 - Top Left */}
        <div className="absolute top-12 left-6 sm:left-12 flex flex-col items-center">
          <span>1</span>
          <span>&#125;</span>
          <span>1</span>
          <span>E</span>
          <span>]</span>
          <span>I</span>
          <span>1</span>
        </div>

        {/* Radar Ring Graphic - Top Left */}
        <div className="absolute top-8 left-4 sm:left-10 w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </div>
        </div>

        {/* Stream 2 - Left Mid */}
        <div className="absolute top-28 left-20 sm:left-36 flex flex-col items-center">
          <span>D</span>
          <span>R 0</span>
          <span>N D</span>
          <span>1 &#125;</span>
          <span>I _</span>
          <span>* 1</span>
          <span>&amp; +</span>
          <span>0 0</span>
          <span>E &#123;</span>
          <span>1 T</span>
          <span>-</span>
        </div>

        {/* Stream 3 - Center Top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
          <span>1</span>
          <span>0</span>
          <span>1</span>
          <span>-</span>
        </div>

        {/* Stream 4 - Right Mid */}
        <div className="absolute top-20 right-28 sm:right-48 flex flex-col items-center">
          <span>S</span>
          <span>N</span>
          <span>%</span>
          <span>*</span>
          <span>]</span>
          <span>1 [</span>
          <span>P</span>
          <span>T</span>
          <span>1</span>
          <span>A</span>
          <span>-</span>
        </div>

        {/* Stream 5 - Far Right */}
        <div className="absolute top-10 right-6 sm:right-16 flex flex-col items-center">
          <span>0</span>
          <span>0</span>
          <span>1</span>
          <span>[</span>
          <span>P</span>
          <span>T</span>
          <span>1</span>
          <span>(</span>
          <span>% $</span>
        </div>

        {/* Lower Left Stream */}
        <div className="absolute bottom-16 left-8 flex flex-col items-center">
          <span>N</span>
          <span>0</span>
          <span>S</span>
          <span>U</span>
          <span>M</span>
          <span>A</span>
          <span>0</span>
          <span>D</span>
        </div>

        {/* Lower Right Stream */}
        <div className="absolute bottom-16 right-8 flex flex-col items-center">
          <span>&lt;</span>
          <span>1</span>
          <span>E</span>
          <span>1</span>
          <span>T</span>
          <span>1</span>
          <span>N</span>
          <span>N</span>
          <span>1 1</span>
          <span>1 1</span>
          <span>[ &gt;</span>
          <span>~ P</span>
          <span>0 0</span>
          <span>% $</span>
          <span>1</span>
          <span>&#123;</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header (Matches image layout exactly) */}
        <div
          className={`text-center mb-12 sm:mb-14 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Cyan Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono-code tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="font-bold text-cyan-300">&gt;_</span>
            <span className="font-medium uppercase tracking-widest text-[11px]">
              INTERACTIVE TERMINAL
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bricolage font-bold text-white tracking-tight mb-3">
            Developer Environment Shell
          </h2>

          {/* Subtitle */}
          <div className="flex justify-center">
            <TextContrastZone
              as="p"
              align="center"
              className="text-sm sm:text-base md:text-lg text-[#F2F0E6] font-light max-w-xl mx-auto leading-relaxed"
            >
              A live terminal simulation reflecting the active command prompt and user greeting.
            </TextContrastZone>
          </div>
        </div>

        {/* Terminal Window Card (Matches navigation bar glassmorphism & reference image) */}
        <div
          onClick={handleTerminalClick}
          style={{ transitionDelay: '140ms' }}
          className={`relative rounded-2xl sm:rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden cursor-text transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } hover:border-white/20`}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-neutral-950/60 border-b border-white/10 select-none">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            {/* Window Title (Matches reference image: guest@savar-shetty:~) */}
            <div className="font-mono-code text-xs sm:text-sm text-white tracking-wide">
              guest@savar-shetty:~
            </div>

            {/* Quick Actions (Reset & Copy) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyHistory();
                }}
                aria-label="Copy terminal text"
                title="Copy terminal contents"
                className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#A6A6A0]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetTerminal();
                }}
                aria-label="Refresh terminal"
                title="Refresh terminal (re-types greeting letter by letter)"
                className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isTypingGreeting ? 'text-cyan-400 animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div
            ref={terminalBodyRef}
            className="p-6 sm:p-8 md:p-10 font-mono-code text-sm sm:text-base leading-relaxed min-h-[280px] max-h-[460px] overflow-y-auto space-y-2.5 selection:bg-cyan-500/30 selection:text-white"
          >
            {/* Typewritten Greeting Lines (Letter-by-Letter) */}
            {GREETING_LINES.map((_, idx) => {
              // During typing, only show lines that have started or completed
              if (idx > activeTypingLine && isTypingGreeting) return null;

              const isCurrentlyTypingThisLine = isTypingGreeting && activeTypingLine === idx;
              const textToShow = isTypingGreeting ? greetingProgress[idx] : GREETING_LINES[idx];

              return (
                <div key={`greet-${idx}`} className="flex items-baseline gap-3 text-white">
                  <span className="text-cyan-400 font-bold select-none">#</span>
                  <span className="tracking-wide text-neutral-100 flex items-center">
                    {textToShow}
                    {isCurrentlyTypingThisLine && (
                      <span className="inline-block w-2.5 h-4.5 bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)] ml-1" />
                    )}
                  </span>
                </div>
              );
            })}

            {/* Post-greeting command history & outputs */}
            {!isTypingGreeting && history.map((item) => {
              if (item.type === 'command') {
                return (
                  <div key={item.id} className="flex items-baseline gap-2 pt-2">
                    <span className="text-cyan-400 text-xs sm:text-sm font-semibold select-none">
                      guest@savar-shetty:~$
                    </span>
                    <span className="text-white font-medium">{item.command}</span>
                  </div>
                );
              }

              if (item.type === 'output' && item.lines) {
                return (
                  <div key={item.id} className="text-white/80 space-y-1 pl-4 border-l-2 border-cyan-500/40 my-2 text-xs sm:text-sm">
                    {item.lines.map((line, idx) => (
                      <div key={idx} className="font-mono-code whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                  </div>
                );
              }

              if (item.type === 'error' && item.lines) {
                return (
                  <div key={item.id} className="text-rose-400 space-y-1 pl-4 border-l-2 border-rose-500/50 my-2 text-xs sm:text-sm">
                    {item.lines.map((line, idx) => (
                      <div key={idx} className="font-mono-code">
                        {line}
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })}

            {/* Active Command Line Prompt (Appears as soon as greeting completes) */}
            {!isTypingGreeting && (
              <div className="flex items-center gap-3 pt-1">
                <span className="text-cyan-400 font-bold select-none text-base">#</span>
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    aria-label="Terminal command prompt"
                    className="w-full bg-transparent border-none outline-hidden text-white font-mono-code text-sm sm:text-base p-0 caret-transparent"
                    placeholder=""
                  />

                  {/* Text cursor visualization - exactly matching reference image block */}
                  <div className="absolute pointer-events-none flex items-center" style={{ left: `${inputVal.length * 9.6}px` }}>
                    <span className="inline-block w-2.5 h-5 bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips Footer */}
          <div className="px-6 py-3.5 bg-neutral-950/40 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code select-none">
            <span className="text-white text-[11px] hidden sm:inline">
              Try executing:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {quickActions.map((cmd) => (
                <button
                  key={cmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    executeCommand(cmd);
                  }}
                  className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all text-[11px] active:scale-95"
                >
                  {cmd}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-white hidden md:block">
              Press [Enter] to submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
