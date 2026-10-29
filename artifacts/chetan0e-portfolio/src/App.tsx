import { lazy, Suspense, useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const HeroPanda = lazy(() => import('./components/hero-panda'));
const JourneyWorld = lazy(() => import('./components/journey-world'));

type Project = {
  name: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  stack: string;
  url: string;
  linkLabel: string;
};

const projects: Project[] = [
  {
    name: 'Intra AI',
    subtitle: 'Adaptive Workforce Intelligence Engine',
    description: 'An AI-powered platform that analyzes resumes and job descriptions to generate personalized, explainable upskilling roadmaps.',
    capabilities: ['Skill-DNA profiling', 'Graph-based dependency mapping', 'Adaptive recommendations', 'Docker-based containerization', 'Production deployment'],
    stack: 'FastAPI · Python · Next.js · Tailwind CSS · Docker · Machine Learning',
    url: 'https://intra-ai.vercel.app/',
    linkLabel: 'Open live project',
  },
  {
    name: 'Musafir',
    subtitle: 'AI Travel Planning Platform',
    description: 'A full-stack AI travel platform designed to automate itinerary generation through a conversational travel assistant and AI place scanner.',
    capabilities: ['Conversational travel assistance', 'AI place scanning', 'JWT authentication', 'REST APIs', 'MongoDB backend', 'Interactive maps', 'PDF itinerary export'],
    stack: 'React · Node.js · Express · MongoDB · Tailwind CSS',
    url: 'https://musafir-azure.vercel.app/',
    linkLabel: 'Open live project',
  },
  {
    name: 'Orbit',
    subtitle: 'Private Study Accountability Platform',
    description: 'A cross-platform mobile application enabling two-person study accountability through real-time presence synchronization and shared goal tracking.',
    capabilities: ['Real-time presence synchronization', 'Shared goal tracking', 'Productivity analytics', 'Smart notifications', 'Riverpod state management', 'Firebase data streams'],
    stack: 'Flutter · Firebase · Riverpod',
    url: 'https://github.com/Chetan0e/Orbit',
    linkLabel: 'View repository',
  },
  {
    name: 'Bloom AI',
    subtitle: 'Interactive AI Learning Platform',
    description: 'An AI-powered educational platform delivering gamified, adaptive learning experiences for AI and machine-learning concepts.',
    capabilities: ['Adaptive AI quizzes', 'Difficulty adjustments based on learner performance', 'AI mentor assistance', 'Contextual learning guidance'],
    stack: 'Next.js · TypeScript · Tailwind CSS · Firebase',
    url: '',
    linkLabel: '',
  },
  {
    name: 'Verath',
    subtitle: 'AI-Powered Personal Memory System',
    description: 'An open-source AI memory system that captures, transcribes, and semantically retrieves personal data.',
    capabilities: ['Audio transcription using Whisper', 'Semantic retrieval using ChromaDB', 'FastAPI backend', 'MongoDB integration', 'Open-source contribution management'],
    stack: 'FastAPI · MongoDB · ChromaDB · Whisper',
    url: 'https://github.com/Chetan0e/Verath',
    linkLabel: 'View repository',
  },
];

const skills = [
  { label: 'Languages', title: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'SQL'] },
  { label: 'Frontend', title: 'Frontend Engineering', items: ['React.js', 'Next.js', 'Flutter', 'Tailwind CSS', 'HTML', 'CSS'] },
  { label: 'Backend', title: 'Backend Engineering', items: ['FastAPI', 'Node.js', 'Express.js', 'Flask', 'REST APIs', 'System Design', 'Authentication'] },
  { label: 'Data', title: 'Databases', items: ['MongoDB', 'Firebase', 'Firestore', 'MySQL'] },
  { label: 'AI / ML', title: 'AI and Machine Learning', items: ['Machine Learning', 'LLMs', 'Prompt Engineering', 'RAG', 'AI Agents', 'Vector Databases', 'ChromaDB', 'FAISS'] },
  { label: 'Tools', title: 'Tools and Infrastructure', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Railway', 'Linux', 'Ollama', 'n8n', 'OpenRouter', 'Cloud Deployment'] },
];

const navItems = [
  ['HOME', 'home'], ['ABOUT', 'about'], ['SKILLS', 'skills'], ['PROJECTS', 'projects'], ['EXPERIENCE', 'experience'], ['CONTACT', 'contact'],
];

const disciplines = [
  { title: 'Full-Stack Engineering', detail: 'Frontend development, backend architecture, authentication, and deployment come together to make complete products.' },
  { title: 'AI & Machine Learning', detail: 'AI integrations, LLM workflows, RAG, vector search, and machine-learning concepts grounded in working applications.' },
  { title: 'Backend & System Design', detail: 'REST APIs, data models, authentication, and system design across documented project work.' },
  { title: 'Product Development', detail: 'Turning a real user need into an interface and a usable software product, then iterating on the details.' },
  { title: 'Experimentation & Research', detail: 'Learning new tools quickly, testing ideas, and improving through deliberate experimentation.' },
];

function Intro({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="intro" role="status" aria-label="Opening Chetan0e portfolio">
      <div className="intro-core">
        <div className="enso" aria-hidden="true" />
        <div className="intro-label">A journey in the making · Chetan0e</div>
      </div>
      <button className="intro-skip" onClick={onSkip} data-testid="button-skip-intro">SKIP INTRO <ArrowRight size={14} /></button>
    </div>
  );
}

function Site() {
  const [introVisible, setIntroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [active, setActive] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [activeScene, setActiveScene] = useState('about');
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    try {
      const probe = document.createElement('canvas');
      const context = (probe.getContext('webgl2') || probe.getContext('webgl') || probe.getContext('experimental-webgl')) as WebGLRenderingContext | WebGL2RenderingContext | null;
      setWebglAvailable(Boolean(context));
      context?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onPreferenceChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener('change', onPreferenceChange);
    const reduced = media.matches;
    let seen = false;
    try { seen = sessionStorage.getItem('chetan0e-intro-seen') === '1'; } catch { /* storage can be unavailable */ }
    const previewingPastIntro = new URLSearchParams(window.location.search).get('skipIntro') === '1';
    if (!seen && !reduced && !previewingPastIntro) {
      setIntroVisible(true);
      const timer = window.setTimeout(() => {
        setIntroVisible(false);
        try { sessionStorage.setItem('chetan0e-intro-seen', '1'); } catch { /* intro remains usable without storage */ }
      }, 2100);
      return () => {
        window.clearTimeout(timer);
        media.removeEventListener('change', onPreferenceChange);
      };
    }
    return () => media.removeEventListener('change', onPreferenceChange);
  }, []);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 35);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const scene = (entry.target as HTMLElement).dataset.scene;
        if (scene) setActiveScene(scene);
        if (navItems.some(([, id]) => id === entry.target.id)) setActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -45% 0px' });
    targets.forEach((target) => observer.observe(target));
    const hero = document.getElementById('home');
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.12 });
    if (hero) heroObserver.observe(hero);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedProject(null); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const skipIntro = () => {
    setIntroVisible(false);
    try { sessionStorage.setItem('chetan0e-intro-seen', '1'); } catch { /* storage is optional */ }
  };
  const closeMenu = () => setMenuOpen(false);
  const openProject = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
  };
  const worldProps = {
    chapter: activeScene,
    reducedMotion,
    selectedSkill,
    selectedDiscipline,
    selectedExperience,
    selectedProject: selectedProjectIndex,
    onSkillSelect: setSelectedSkill,
    onDisciplineSelect: setSelectedDiscipline,
    onExperienceSelect: setSelectedExperience,
    onProjectSelect: (index: number) => openProject(projects[index], index),
  };
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus('Please complete every field with a valid email address.');
      return;
    }
    const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:chetanrangari0e52@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setFormStatus('Your email app should open with this message ready. It has not been sent yet.');
  };

  return (
    <main className="portfolio">
      <Suspense fallback={null}>
        {webglAvailable && !heroVisible && <JourneyWorld {...worldProps} />}
      </Suspense>
      {introVisible && <Intro onSkip={skipIntro} />}
      <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Chetan0e home" data-testid="link-home">
          <span className="brand-mark" aria-hidden="true">C0</span><span>CHETAN0E</span>
        </a>
        <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={closeMenu} data-testid={`link-nav-${id}`}>{label}</a>)}
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <section className="hero" id="home" data-scene="home" aria-label="Chetan Rangari portfolio introduction" onPointerMove={(event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--tilt-x', `${(event.clientX - box.left - box.width / 2) / box.width * -12}px`);
        event.currentTarget.style.setProperty('--tilt-y', `${(event.clientY - box.top - box.height / 2) / box.height * -8}px`);
      }}>
        <div className="hero-art" aria-hidden="true" />
        <Suspense fallback={null}>{webglAvailable && heroVisible && <HeroPanda reducedMotion={reducedMotion} />}</Suspense>
        <div className="hero-foreground" aria-hidden="true">
          <svg viewBox="0 0 1440 500" preserveAspectRatio="none">
            <g fill="none" stroke="#19271f" strokeLinecap="round">
              <path d="M22 520Q42 300 18 0M77 520Q112 333 83 60M137 520Q164 324 149 12M1320 520Q1285 322 1317 8M1390 520Q1362 282 1408 30M1450 520Q1412 340 1435 135" strokeWidth="18" opacity=".62" />
              <path d="M8 105l120 58m-94 48 114 35m-97 89 92-11m1090-222-123 62m176 22-112 57m134 78-120-9" strokeWidth="8" opacity=".52" />
              <path d="M13 114l-48-37m101 89 62-51m-45 135 74-17m-25 82-64-24m1225-172 52-44m-175 123-66-38m176 127 78-22m-134 71-41-33" strokeWidth="5" opacity=".42" />
            </g>
          </svg>
        </div>
        <div className="hero-inner">
          <div className="eyebrow">A path to mastery · software &amp; AI</div>
          <h1>Every legend<br />starts <em>somewhere.</em></h1>
          <p className="hero-copy">I'm Chetan Rangari — a full-stack and AI engineer building intelligent applications, useful software products, and ambitious ideas into reality.</p>
          <div className="identity"><strong>CHETAN RANGARI</strong><span>AI &amp; ML ENGINEER / FULL-STACK DEVELOPER</span></div>
          <div className="actions">
            <a className="button primary" href="#about" data-testid="button-explore">Explore my journey <ArrowDown size={14} /></a>
            <a className="button" href="#projects" data-testid="button-discover">Discover my work <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="scroll-cue">Scroll to begin</div>
        <div className="hero-note">Valley of Peace · Chapter zero</div>
      </section>

      <section className="chapter about" id="about" data-scene="about">
        <div className="chapter-inner about-layout">
          <div>
            <div className="chapter-no">Chapter 01 — The beginning</div>
            <h2>Curiosity was<br />the beginning.</h2>
            <p className="chapter-intro">I'm Chetan Rangari, a Computer Science Engineering student at D. Y. Patil College of Engineering and Technology, Kolhapur.</p>
            <p className="chapter-intro">I build full-stack applications, AI-powered platforms, and automation tools, working across frontend development, backend architecture, machine learning integrations, and deployment. I enjoy learning new technologies quickly and taking complex ideas from concept to working software.</p>
          </div>
          <aside className="about-aside">
            <p>An ordinary starting point can still open up an extraordinary path. The work is showing up, staying curious, and building the next thing.</p>
            <div className="facts">
              <div className="fact"><strong>Computer Science</strong><span>Engineering · DYPCET</span></div>
              <div className="fact"><strong>9.00 SGPA</strong><span>Academic record</span></div>
              <div className="fact"><strong>2028</strong><span>Expected graduation</span></div>
              <div className="fact"><strong>Building</strong><span>Full-stack · AI / ML · products</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="chapter skills" id="skills" data-scene="skills">
        <div className="chapter-inner">
          <div className="chapter-no">Chapter 02 — The training</div>
          <h2>Mastery comes<br />through practice.</h2>
          <p className="chapter-intro">Every tool is a skill to learn. Every difficult problem is another opportunity to improve. Choose a station to see the tools in the kit.</p>
          <div className="skill-explorer">
            <div className="skill-tabs" role="tablist" aria-label="Technical skill categories">
              {skills.map((skill, index) => <button className="skill-tab" role="tab" aria-selected={selectedSkill === index} aria-controls="skill-readout" key={skill.label} onClick={() => setSelectedSkill(index)} data-testid={`tab-skill-${skill.label.toLowerCase().replace(/[^a-z]/g, '-')}`}>{skill.label}</button>)}
            </div>
            <div className="skill-readout" id="skill-readout" role="tabpanel">
              <h3>{skills[selectedSkill].title}</h3>
              <div className="skill-list">{skills[selectedSkill].items.map((item) => <span className="skill-chip" key={item}>{item}</span>)}</div>
              <div className="skill-note">A working toolkit — no invented proficiency scores.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter disciplines" id="disciplines" data-scene="disciplines" aria-label="Engineering disciplines">
        <div className="chapter-inner">
          <div className="chapter-no">The disciplines · one practice</div>
          <h2 style={{ fontSize: 'clamp(34px,5vw,58px)' }}>Different paths. Shared purpose.</h2>
          <div className="discipline-row" role="tablist" aria-label="Engineering disciplines">
            {disciplines.map((discipline, index) => <button key={discipline.title} className={`discipline${selectedDiscipline === index ? ' selected' : ''}`} aria-selected={selectedDiscipline === index} role="tab" onClick={() => setSelectedDiscipline(index)} data-testid={`tab-discipline-${index + 1}`}><span className="discipline-num">0{index + 1}</span><strong>{discipline.title}</strong></button>)}
          </div>
          <p className="discipline-detail" role="tabpanel">{disciplines[selectedDiscipline].detail}</p>
        </div>
      </section>

      <section className="chapter projects" id="projects" data-scene="projects">
        <div className="chapter-inner">
          <div className="chapter-no">Chapter 03 — The Dragon Scrolls</div>
          <h2>Ideas turned<br />into reality.</h2>
          <p className="chapter-intro">Every project starts with a problem worth solving. These are some of the ideas I've brought to life.</p>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.name} onClick={() => openProject(project, index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(project, index); } }} tabIndex={0} role="button" aria-label={`Open ${project.name} project details`} data-testid={`card-project-${project.name.toLowerCase().replace(/\s/g, '-')}`}>
                <span className="project-no">SCROLL 0{index + 1}</span>
                <div><div className="project-name">{project.name}</div><div className="project-sub">{project.subtitle}</div></div>
                <p className="project-summary">{project.description}</p>
                <span className="project-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
              </article>
            ))}
          </div>
          <p className="work-note">Select a scroll to read the project details · links open in a new tab.</p>
        </div>
      </section>

      <section className="chapter experience" id="experience" data-scene="experience">
        <div className="chapter-inner">
          <div className="chapter-no">Chapter 04 — The journey</div>
          <h2>Growth is built<br />one step at a time.</h2>
          <p className="chapter-intro">Responsibility, collaboration, and consistent execution — the climb is made of small contributions.</p>
          <div className="timeline">
            <article className={`timeline-item${selectedExperience === 0 ? ' selected' : ''}`}>
              <button className="timeline-button" aria-pressed={selectedExperience === 0} onClick={() => setSelectedExperience(0)} aria-label="Secretary, Coding Club at DYPCET details" data-testid="button-experience-coding-club"><h3>Secretary, Coding Club</h3><span className="timeline-org">DYPCET</span><br /><span className="timeline-period">2025–2026</span></button>
              <p className="timeline-detail">Promoted to Secretary within two months of joining based on leadership and execution performance. Leads a technical community of more than 300 members, plans coding challenges, hackathons, and technical events, and designs project-based, industry-relevant learning initiatives.</p>
            </article>
            <article className={`timeline-item${selectedExperience === 1 ? ' selected' : ''}`}>
              <button className="timeline-button" aria-pressed={selectedExperience === 1} onClick={() => setSelectedExperience(1)} aria-label="Tech Team Member at Microsoft Learn Student Ambassadors details" data-testid="button-experience-mlsa"><h3>Tech Team Member</h3><span className="timeline-org">Microsoft Learn Student Ambassadors</span><br /><span className="timeline-period">2025–2026</span></button>
              <p className="timeline-detail">Supports technical initiatives and events, and contributes to student-facing developer programs and outreach.</p>
            </article>
            <article className={`timeline-item${selectedExperience === 2 ? ' selected' : ''}`}>
              <button className="timeline-button" aria-pressed={selectedExperience === 2} onClick={() => setSelectedExperience(2)} aria-label="Project Admin for Verath at GirlScript Summer of Code details" data-testid="button-experience-verath"><h3>Project Admin — Verath</h3><span className="timeline-org">GirlScript Summer of Code</span><br /><span className="timeline-period">Present</span></button>
              <p className="timeline-detail">Manages open-source contributions, reviews issues and pull requests, maintains contributor workflow quality, and supports code quality within an active open-source codebase.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="chapter wisdom" id="wisdom" data-scene="wisdom" aria-label="Engineering philosophy">
        <div className="chapter-inner">
          <div className="chapter-no">A pause beneath the peach tree</div>
          <h2>Inner peace.<br />Outer innovation.</h2>
          <p className="wisdom-quote">I believe the best engineering begins with curiosity, grows through experimentation, and becomes meaningful when it solves real problems.</p>
          <div className="principles">
            <article className="principle"><span>01 / ATTITUDE</span><h3>Stay Curious</h3><p>Explore technologies, ask difficult questions, and continue learning.</p></article>
            <article className="principle"><span>02 / INTENT</span><h3>Build With Purpose</h3><p>Create practical software that solves real problems.</p></article>
            <article className="principle"><span>03 / PRACTICE</span><h3>Improve Through Practice</h3><p>Use experimentation, feedback, and iteration to develop better solutions.</p></article>
          </div>
        </div>
      </section>

      <section className="chapter challenge" id="challenge" data-scene="challenge" aria-label="Engineering approach">
        <div className="chapter-inner">
          <div className="chapter-no">The challenges · a way through</div>
          <h2>Every challenge<br />has a way through.</h2>
          <p className="chapter-intro">The story is never about the obstacle alone. It is about understanding the problem, choosing an approach, and making something that works.</p>
          <div className="challenge-flow">
            <article className="challenge-step"><span>STAGE 01</span><h3>The Problem</h3><p>Start with a real need: a skills gap, a trip to plan, a study commitment to keep, a concept to learn, or information worth remembering.</p></article>
            <article className="challenge-step"><span>STAGE 02</span><h3>The Approach</h3><p>Use the documented tools and decisions: adaptive recommendations, conversational assistance, real-time presence, learning guidance, or semantic retrieval.</p></article>
            <article className="challenge-step"><span>STAGE 03</span><h3>The Outcome</h3><p>Explore the actual applications and repositories. Each project detail includes its verified description, technologies, and available link.</p></article>
          </div>
          <a className="button light" href="#projects" style={{ marginTop: 35 }}>Explore the project scrolls <ArrowRight size={14} /></a>
        </div>
      </section>

      <section className="chapter education" id="education" data-scene="education" aria-label="Education and achievements">
        <div className="chapter-inner">
          <div className="chapter-no">The archive · learning in progress</div>
          <h2>A foundation for<br />what comes next.</h2>
          <div className="edu-grid">
            <article className="edu-card"><span className="label">Education</span><h3>B.Tech in Computer Science Engineering</h3><p>D. Y. Patil College of Engineering and Technology, Kolhapur<br />SGPA: 9.00 · Expected graduation: 2028</p></article>
            <article className="edu-card"><span className="label">Certification</span><h3>Google Cloud Gen AI Academy 2.0</h3><p>Completed · Focus: Generative AI, LLMs, AI/ML</p></article>
            <article className="edu-card"><span className="label">Open source · GSSoC</span><h3>Community and code</h3><p>Mentor · Project Admin · Contributor · Ambassador</p></article>
            <article className="edu-card"><span className="label">The next chapter</span><h3>Keep building.</h3><p>Learning and making useful software, one iteration at a time.</p></article>
          </div>
        </div>
      </section>

      <section className="chapter contact" id="contact" data-scene="contact">
        <div className="chapter-inner">
          <div className="chapter-no">Final chapter — The lantern festival</div>
          <h2>Every great journey<br />starts with a conversation.</h2>
          <p className="chapter-intro">Have an interesting problem, an ambitious idea, or a project worth building? Let's create something meaningful together.</p>
          <div className="contact-layout">
            <div>
              <a className="button light" href="mailto:chetanrangari0e52@gmail.com?subject=Let%27s%20build%20something" data-testid="link-contact-email">Let's build something <ArrowUpRight size={14} /></a>
              <div className="contact-links" style={{ marginTop: 32 }}>
                <a className="contact-link" href="mailto:chetanrangari0e52@gmail.com"><span>Email</span><span>chetanrangari0e52@gmail.com ↗</span></a>
                <a className="contact-link" href="tel:+919322134721"><span>Phone</span><span>+91 9322134721 ↗</span></a>
                <a className="contact-link" href="https://github.com/Chetan0e" target="_blank" rel="noreferrer"><span>GitHub</span><span>Chetan0e ↗</span></a>
                <a className="contact-link" href="https://linkedin.com/in/chetan-rangari-97342832b" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect ↗</span></a>
                <a className="contact-link" href="https://www.chetan0e.space/" target="_blank" rel="noreferrer"><span>Portfolio</span><span>chetan0e.space ↗</span></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact} noValidate>
              <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" data-testid="input-name" /></div>
              <div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" data-testid="input-email" /></div>
              <div className="field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required placeholder="What are you thinking about?" data-testid="input-subject" /></div>
              <div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="A little about the idea..." data-testid="input-message" /></div>
              <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
              <button className="button light" type="submit" data-testid="button-send-message">Prepare email <ArrowUpRight size={14} /></button>
            </form>
          </div>
        </div>
      </section>
      <footer className="footer"><span>© {new Date().getFullYear()} CHETAN RANGARI · CHETAN0E</span><a href="#home">BACK TO THE VALLEY ↑</a></footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" data-testid="dialog-project-details">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details" data-testid="button-close-project"><X size={19} /></button>
            <span className="project-no">THE DRAGON SCROLL ARCHIVE</span>
            <h2 id="project-title">{selectedProject.name}</h2>
            <div className="project-sub">{selectedProject.subtitle}</div>
            <p>{selectedProject.description}</p>
            <ul className="modal-list">{selectedProject.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
            <div className="tech-line">TECHNOLOGIES<br />{selectedProject.stack}</div>
            <div className="modal-actions">
              {selectedProject.url ? <a className="button primary" href={selectedProject.url} target="_blank" rel="noreferrer" data-testid="link-project-destination">{selectedProject.linkLabel} <ArrowUpRight size={14} /></a> : <span className="work-note">No public project link supplied.</span>}
              <button className="button" onClick={() => setSelectedProject(null)}>Return to archive</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Switch><Route path="/" component={Site} /><Route><main className="chapter"><h1>Page not found</h1><a href="/">Return to Chetan0e</a></main></Route></Switch></WouterRouter>;
}

export default App;
