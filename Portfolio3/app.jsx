const { useEffect, useState } = React;

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "TechHeaven – Music Streaming Web Application",
    description:
      "Developed a responsive music streaming web application using HTML, CSS, Tailwind CSS, JavaScript, and React JS. Implemented Firebase Authentication for secure user login and registration, integrated Firebase Realtime Database to store user credentials and song data, and designed reusable React components to optimize UI rendering.",
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React JS", "Firebase"],
    imageAlt: "TechHeaven music app UI preview",
    github: "#",
    demo: "#",
  },
  {
    title: "User Login System with RegEx Validation",
    description:
      "Built a secure login and registration system using HTML, CSS, and JavaScript. Implemented Regular Expressions (RegEx) for email validation and password strength verification, applied DOM manipulation for real-time form validation, and reduced invalid submissions with improved input security.",
    tech: ["HTML", "CSS", "JavaScript"],
    imageAlt: "User login system UI preview",
    github: "#",
    demo: "#",
  },
  {
    title: "Neuro Roads – AI-Based Vehicle Control Concept",
    description:
      "Designed a neuro-signal-based vehicle control system concept as part of a team project. Focused on system architecture, signal processing logic, and feasibility analysis while collaborating on end-to-end workflow and presentation design.",
    tech: ["AI/ML Concept", "System Design", "Team Project"],
    imageAlt: "Neuro Roads AI-based vehicle control concept preview",
    github: "#",
    demo: null,
  },
  {
    title: "WhatsApp Clone (UI Design)",
    description:
      "Designed a high-fidelity WhatsApp clone UI prototype in Figma focusing on user experience, layout consistency, and modern mobile-first interface design.",
    tech: ["Figma"],
    imageAlt: "WhatsApp clone UI design preview",
    github: "#",
    demo: null,
  },
];

function useActiveSection(sectionIds) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function NavBar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 text-lg font-semibold shadow-soft sm:h-9 sm:w-9 sm:rounded-2xl sm:text-xl">
            HR
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-wide text-slate-100">
              Harish Raghavender S
            </span>
            <span className="text-xs text-slate-400">
              Python Full Stack Developer
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 shadow-soft/40 ring-1 ring-slate-700/70 md:flex">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={
                "rounded-full px-3 py-1.5 transition-all duration-200 " +
                (activeSection === section.id
                  ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 text-slate-50 shadow-soft"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50")
              }
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-soft transition hover:scale-[1.03] hover:shadow-soft/80 md:inline-flex"
          >
            Let&apos;s Connect
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 transition hover:bg-slate-800/80 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={
                    "rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 " +
                    (activeSection === section.id
                      ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 text-slate-50 shadow-soft"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50")
                  }
                >
                  {section.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-soft transition hover:scale-[1.02] hover:shadow-soft/80"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SocialIcon({ type, href, label }) {
  const icons = {
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.34H4.8V24H.22zM8.34 8.34H12.7v2.13h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V24H17.9v-7.55c0-1.8-.03-4.12-2.51-4.12-2.51 0-2.9 1.96-2.9 3.99V24H8.34z" />
      </svg>
    ),
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.8 1.18 1.83 1.18 3.09 0 4.44-2.69 5.41-5.25 5.7.42.37.8 1.1.8 2.22 0 1.6-.02 2.88-.02 3.27 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
    email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 12h16V9l-8 7-8-7v9z" />
      </svg>
    ),
    leetcode: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.571 15.306c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.99-4.99c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l1.99 1.99c.467.467 1.111.662 1.824.662s1.357-.195 1.823-.662l2.607-2.607c.467-.467 1.15-.702 1.863-.702s1.357.235 1.824.702l2.607 2.607c.467.467.702 1.15.702 1.863s-.235 1.357-.702 1.824l-2.607 2.607c-.467.467-1.15.702-1.863.702s-1.357-.235-1.824-.702zm-1.99-1.99l2.607-2.607c.467-.467.702-1.15.702-1.863s-.235-1.357-.702-1.824l-2.607-2.607c-.467-.467-1.15-.702-1.863-.702s-1.357.235-1.824.702l-2.607 2.607c-.467.467-.702 1.15-.702 1.863s.235 1.357.702 1.824l2.607 2.607c.467.467 1.15.702 1.863.702s1.357-.235 1.824-.702z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target={type === "email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-500/40 bg-slate-900/60 text-slate-200 shadow-soft/60 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-indigo-400/80 hover:bg-slate-900 hover:text-white"
    >
      {icons[type]}
    </a>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-20 pb-12 sm:pt-28 sm:pb-16"
    >
      <div className="absolute inset-x-0 top-20 -z-10 flex justify-center">
        <div className="h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-sky-400/20 blur-3xl sm:h-72 sm:w-72" />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:gap-12">
        <div className="reveal-section w-full max-w-xl text-center lg:text-left">
          <p className="inline-flex items-center rounded-full border border-indigo-400/40 bg-slate-900/60 px-3 py-1.5 text-[11px] font-medium text-indigo-200 shadow-soft/60 backdrop-blur-md sm:text-xs">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span className="whitespace-nowrap">Open to full-time & freelance opportunities</span>
          </p>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="block text-slate-300 text-xs mb-2 tracking-[0.25em] uppercase sm:text-sm">
              Python Full Stack Developer
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Harish Raghavender S
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm md:text-base">
            I build scalable web applications using Python frameworks and
            integrate AI-powered backend systems for intelligent
            solutions.
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm md:text-base">
            Focused on delivering robust APIs, clean React interfaces, and
            production-ready full-stack architectures.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-soft transition hover:scale-[1.03] hover:shadow-soft/90 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              View Projects
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4 lg:justify-start">
            <SocialIcon
              type="linkedin"
              href="https://www.linkedin.com/in/harish-raghavender-s-a913653b0"
              label="LinkedIn"
            />
            <SocialIcon
              type="github"
              href="https://github.com/harishraghavenders631-sys"
              label="GitHub"
            />
            <SocialIcon
              type="leetcode"
              href="https://leetcode.com/u/aLni3gxns7/"
              label="LeetCode"
            />
            <SocialIcon
              type="email"
              href="mailto:harishraghavender078@gmail.com"
              label="Email"
            />
          </div>
        </div>

        {/* Photo Container - Hidden on mobile, visible on large screens */}
        <div className="reveal-section mt-12 hidden lg:flex lg:mt-0 lg:flex-shrink-0 lg:pt-8">
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 p-1 blur-sm opacity-50"></div>
            <div className="relative rounded-3xl bg-slate-900 p-2 shadow-soft">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <img
                  src="./profile.png"
                  alt="Harish Raghavender S"
                  className="h-48 w-48 object-cover object-center sm:h-52 sm:w-52 lg:h-56 lg:w-56"
                  style={{ 
                    filter: 'contrast(1.1) brightness(0.92)',
                  }}
                />
                {/* Dark overlay to blend white background with dark theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-transparent to-slate-950/60 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionShell({ id, label, eyebrow, children }) {
  return (
    <section
      id={id}
      className="reveal-section mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-xl font-semibold text-slate-50 sm:text-2xl md:text-3xl">
            {label}
          </h2>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-[11px] text-indigo-300 ring-1 ring-slate-700/80">
            {id === "skills"
              ? "02"
              : id === "projects"
              ? "03"
              : id === "contact"
              ? "04"
              : "01"}
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
            {label}
          </span>
        </div>
      </div>
      {children}
    </section>
  );
}

function AboutSection() {
  return (
    <SectionShell id="about" label="About Me" eyebrow="Background">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-5 text-xs leading-relaxed text-slate-800 shadow-soft/70 sm:p-6 md:p-8 md:text-sm">
          <p>
            I am a passionate Python Full Stack Developer focused on building
            responsive and scalable web applications. I work with Django,
            Flask, and FastAPI to create robust backend systems and integrate
            AI capabilities into modern web platforms. I enjoy designing clean
            UI experiences using React and Tailwind CSS, and I continuously
            improve my skills in full-stack architecture, database
            management, and performance optimization. My goal is to develop
            good websites and AI-integrated web applications.
          </p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4 text-[11px] text-slate-800 shadow-soft/60 sm:text-xs">
            <p className="mb-1 text-[10px] font-semibold text-slate-400 sm:text-[11px]">
              Focus Areas
            </p>
            <p className="leading-relaxed">
              Full-stack architecture · RESTful APIs · Authentication &
              authorization · Database design · Performance optimization ·
              Scalable deployments
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4 text-[11px] text-slate-800 shadow-soft/70 sm:text-xs">
            <p className="mb-1 text-[10px] font-semibold text-slate-400 sm:text-[11px]">
              Currently Exploring
            </p>
            <p className="leading-relaxed">
              AI-powered features on top of Python backends, leveraging
              modern ML tools, vector databases, and asynchronous FastAPI
              services.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function SkillsSection() {
  const categoryClasses =
    "rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-soft/80 backdrop-blur-xl sm:p-6";

  const labelClasses = "text-xs font-semibold text-slate-400 uppercase";

  const pillClasses =
    "inline-flex items-center rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-100 ring-1 ring-slate-600/80 sm:px-3 sm:text-xs";

  return (
    <SectionShell id="skills" label="Skills" eyebrow="Core Stack">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className={categoryClasses}>
          <p className={labelClasses}>Programming</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={pillClasses}>Python</span>
            <span className={pillClasses}>Java (Basics)</span>
          </div>
        </div>

        <div className={categoryClasses}>
          <p className={labelClasses}>Frontend</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={pillClasses}>HTML</span>
            <span className={pillClasses}>CSS</span>
            <span className={pillClasses}>JavaScript</span>
            <span className={pillClasses}>React JS (Basics)</span>
            <span className={pillClasses}>Tailwind CSS</span>
          </div>
        </div>

        <div className={categoryClasses}>
          <p className={labelClasses}>Backend &amp; Database</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={pillClasses}>Django</span>
            <span className={pillClasses}>Flask</span>
            <span className={pillClasses}>FastAPI</span>
            <span className={pillClasses}>SQL</span>
          </div>
        </div>

        <div className={categoryClasses}>
          <p className={labelClasses}>Tools</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={pillClasses}>VS Code</span>
            <span className={pillClasses}>Git</span>
            <span className={pillClasses}>GitHub</span>
            <span className={pillClasses}>Figma</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/70 shadow-soft/80 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-soft">
      <div className="relative h-36 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 sm:h-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_55%)]" />
        <div className="relative flex h-full items-center justify-center">
          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 ring-1 ring-slate-600/80 sm:px-4 sm:text-xs">
            UI Preview
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
          {project.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-200 ring-1 ring-slate-600/80 sm:px-2.5 sm:py-1 sm:text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-2.5 text-[11px] font-semibold text-slate-100 transition hover:border-indigo-400/80 hover:bg-slate-900 sm:w-auto sm:flex-1 sm:text-xs"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <SectionShell id="projects" label="Projects" eyebrow="Selected Work">
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <SectionShell id="contact" label="Contact" eyebrow="Let&apos;s Talk">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-xs text-slate-300 sm:text-sm">
          Ready to collaborate on building intelligent, production-ready web
          applications. Reach out directly through phone or email.
        </p>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2">
          <a
            href="tel:+919445975490"
            className="group flex flex-col items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 text-xs text-slate-100 shadow-soft/80 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-emerald-400/90 hover:shadow-soft sm:p-6 sm:text-sm"
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40 sm:h-9 sm:w-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 12.36 12.36 0 0 0 3.88.62 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 12.36 12.36 0 0 0 .62 3.88 1 1 0 0 1-.25 1.01z" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
              Phone
            </span>
            <span className="mt-2 text-sm font-semibold text-slate-50 break-all sm:text-base">
              +91 9445975490
            </span>
            <span className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              Tap to open mobile dialer
            </span>
          </a>

          <a
            href="mailto:harishraghavender078@gmail.com"
            className="group flex flex-col items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 text-xs text-slate-100 shadow-soft/80 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-indigo-400/90 hover:shadow-soft sm:p-6 sm:text-sm"
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/40 sm:h-9 sm:w-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 12h16V9l-8 7-8-7v9z" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
              Email
            </span>
            <span className="mt-2 text-sm font-semibold text-slate-50 break-all sm:text-base">
              harishraghavender078@gmail.com
            </span>
            <span className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              Opens your default email client
            </span>
          </a>
        </div>
      </div>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
        <p>Built with passion by Harish Raghavender S © 2026</p>
        <p className="text-[11px]">
          Crafted with React, Tailwind CSS, and a backend-ready architecture.
        </p>
      </div>
    </footer>
  );
}

function App() {
  const activeSection = useActiveSection(SECTIONS.map((s) => s.id));
  useRevealOnScroll();

  return (
    <div className="min-h-screen">
      <NavBar activeSection={activeSection} />
      <main className="space-y-4">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

