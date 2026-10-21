import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Home,
  User,
  FolderOpen,
  Terminal,
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
  Send,
  MapPin,
  Sparkles,
  FilePlus2,
  ArrowRight,
} from "lucide-react";

/* lucide-react's Github/Linkedin exports aren't available in every
   installed version, so these are plain inline SVGs instead. */
function GithubIcon({ size = 16, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function LinkedinIcon({ size = 16, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAME = "Janelle Despabiladero";
const ROLE = "IT Student · Backend Developer";
const TAGLINE =
  "I build systems that hold up under real use — inventory logic, role-based dashboards, and the unglamorous backend work that keeps a product honest.";

const SECTIONS = [
  { id: "home", label: "Home", file: "home.tsx", icon: Home },
  { id: "about", label: "About", file: "about.md", icon: User },
  { id: "projects", label: "Projects", file: "projects/", icon: FolderOpen },
  { id: "skills", label: "Skills", file: "skills.json", icon: Terminal },
  {
    id: "experience",
    label: "Experience",
    file: "experience.log",
    icon: Briefcase,
  },
  {
    id: "education",
    label: "Education",
    file: "education.md",
    icon: GraduationCap,
  },
  { id: "contact", label: "Contact", file: "contact.sh", icon: Mail },
];

const PROJECTS = [
  {
    name: "FranchiSync",
    file: "iFranchise/",
    status: "Coursework",
    description:
      "FranchiSync is a centralized franchise management system built with React, Node.js, and PostgreSQL, with mobile components developed using React Native. It streamlines operations between franchisors and franchisees through franchise applications, inventory and stock monitoring, POS transactions, sales tracking, and business analytics. The system provides both web and mobile platforms for managing and monitoring multiple franchise branches efficiently.",
    highlights: [
      "Automatic FIFO/FEFO stock transfer when a franchisee order is marked received",
      "Real-time inventory and stock monitoring across multiple franchise branches",
      "Role-based read-only mode and a full activity log across every module",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "React Native",
    ],
    codeUrl: "https://github.com/despaj/Capstonee-main",
    liveUrl: "https://www.franchisync.business",
    featured: true,
  },
  {
    name: "Solace Studios Photobooth",
    file: "solace-studios.html",
    status: "Coursework",
    description:
      "A 2nd-year HTML course project: a web photobooth that captures a four-photo strip from the webcam, with live filters, a selectable countdown timer, and per-photo retakes. Users pick a frame color or design, then download the finished strip as an image. Includes a booking page backed by a serverless API and Supabase.",
    highlights: [
      "Browser camera capture with countdown, live filters, and click-to-retake on any single photo",
      "Booking form posting to a Vercel serverless endpoint that stores requests in Supabase",
    ],
    tech: ["HTML", "CSS", "JavaScript", "html2canvas", "Vercel", "Supabase"],
    codeUrl: "https://github.com/despaj/Solace-Studios-Photobooth.git",
    liveUrl: "https://solace-studios-photobooth-solace-st.vercel.app",
    featured: false,
  },
  {
    name: "MovieBoxd",
    file: "moviebox/",
    status: "Coursework",
    description:
      "MovieBoxd is a movie review web app built with Spring Boot and JSP. Users browse popular films or search any title through the TMDB API, then rate movies from 1 to 5 stars and write reviews. Each movie page shows the community's average rating, and every user has a profile listing their own reviews. The app is deployed with Docker on Render and stores its data in PostgreSQL on Supabase.",
    highlights: [
      "TMDB API integration for popular movies, search, and movie details, with a cached popular list",
      "Session-based login with BCrypt password hashing, plus an admin dashboard",
      "One review per user per movie, with live average ratings computed in a single grouped query",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "JSP",
      "Spring Data JPA",
      "PostgreSQL",
      "Supabase",
      "Docker",
      "Render",
    ],
    codeUrl: "https://github.com/despaj/MovieBoxd",
    liveUrl: "https://movieboxd-461j.onrender.com/login",
    featured: false,
  },
];

const SKILLS = [
  {
    group: "Languages",
    file: "languages.json",
    items: ["Java", "JavaScript", "Dart", "SQL", "HTML", "CSS"],
  },
  {
    group: "Frontend",
    file: "frontend.json",
    items: ["React", "React Native", "Flutter"],
  },
  {
    group: "Backend",
    file: "backend.json",
    items: ["Node.js", "Express", "Spring Boot"],
  },
  {
    group: "Data",
    file: "data.json",
    items: ["PostgreSQL", "Supabase", "MySQL"],
  },
  {
    group: "Tooling",
    file: "tooling.json",
    items: ["Git", "GitHub", "VS Code", "Docker", "Vercel", "Render"],
  },
];

const EXPERIENCE = [
  {
    when: "Finished",
    role: "Capstone Developer — iFranchise",
    where: "Group / Capstone Project",
    points: [
      "Designed and rebuilt the franchisee dashboard around a shared design system (CSS custom properties, consistent typography, branch-scoped KPIs)",
      "Wired activity logging into six+ modules — Dashboard, Inventory, Brand Management, Shop, Sales & Reports, Announcements, Orders, Franchisee Applications, Users, POS — each with its own audit trail",
      "Diagnosed and fixed a PgBouncer pool exhaustion issue by switching connection modes and consolidating concurrent queries into single joins",
      "Integrated session-based ID verification with OCR fallback for the franchise application flow",
    ],
  },
];

const EDUCATION = [
  {
    when: "Present",
    degree: "BS in Information Technology",
    where: "National University - MOA Campus",
    points: [
      "Coursework spanning full-stack web development, mobile development, and database systems",
      "Capstone: iFranchise, a full-stack franchise management system",
    ],
  },
  {
    when: "2021-2023",
    degree: "Senior High School - STEM",
    where: "Arellano University - Plaridel Campus",
    points: ["Graduated with High Honors"],
  },
  {
    when: "2017-2021",
    degree: "Junior High School",
    where: "Bonifacio Javier National High School",
    points: ["Graduated with Honors"],
  },
];

const CONTACT = {
  email: "despajanelle@gmail.com",
  github: "https://github.com/despaj",
  linkedin: "https://linkedin.com/in/jdespabiladero",
  location: "Philippines",
};

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const ratios = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });
        const best = Object.entries(ratios.current).sort(
          (a, b) => b[1] - a[1],
        )[0];
        if (best && best[1] > 0) setActive(best[0]);
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

function FolderNav({ active, onNavigate }) {
  return (
    <nav className="fn" aria-label="Section navigation">
      <div className="fn-rail">
        {SECTIONS.map(({ id, label, file, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              className={`fn-tab${isActive ? " is-active" : ""}`}
              onClick={() => onNavigate(id)}
              aria-current={isActive ? "true" : undefined}
            >
              <Icon size={15} strokeWidth={2} className="fn-tab-icon" />
              <span className="fn-tab-label">{label}</span>
              <span className="fn-tab-file">{file}</span>
            </button>
          );
        })}
      </div>
      <div className="fn-shelf" aria-hidden="true" />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION SHELL — every section reads like an open file              */
/* ------------------------------------------------------------------ */

function FileHeader({ file, label }) {
  return (
    <div className="file-header">
      <span className="file-dot" aria-hidden="true" />
      <span className="file-name">{file}</span>
      <span className="file-label">{label}</span>
    </div>
  );
}

function Section({ id, file, label, alt, children }) {
  return (
    <section id={id} className={`section${alt ? " section--alt" : ""}`}>
      <div className="section-inner">
        <FileHeader file={file} label={label} />
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}

function HomeSection({ onNavigate }) {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <Sparkles size={14} strokeWidth={2} />
            open for opportunities
          </p>
          <h1 className="hero-name">{NAME}</h1>
          <p className="hero-role">{ROLE}</p>
          <p className="hero-tagline">{TAGLINE}</p>
          <div className="hero-actions">
            <button
              className="btn btn--primary"
              onClick={() => onNavigate("projects")}
            >
              View projects
              <ArrowRight size={16} strokeWidth={2} />
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => onNavigate("contact")}
            >
              Get in touch
            </button>
          </div>
        </div>

        <div className="hero-frame" aria-hidden="true">
          <div className="hero-tab">profile.png</div>
          <div className="hero-avatar">
            <img
              src="/profile.jpg"
              alt="Janelle Despabiladero"
              className="hero-photo"
            />
          </div>
          <div className="hero-frame-footer">
            <span className="hero-frame-dot" />
            <span className="hero-frame-dot" />
            <span className="hero-frame-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section id="about" file="about.md" label="About">
      <div className="about-grid">
        <div className="about-text">
          <h2 className="h2">
            Building practical solutions through code and creativity.
          </h2>
          <p>
            I'm an IT student who spends most of my time inside one long-running
            project: iFranchise, a franchise management system built with React,
            Node.js, and PostgreSQL, with React Native components underway. I've
            rebuilt and improved the system more than once as new requirements
            and challenges emerged throughout its development.
          </p>
          <p>
            Along the way, I've gained hands-on experience in web and mobile
            development, databases, networking, and game development. I enjoy
            turning ideas into practical, user-friendly solutions while
            continuously learning new technologies and improving the way I
            design and build systems.
          </p>
        </div>
        <aside className="about-card">
          <div className="about-card-row">
            <MapPin size={15} strokeWidth={2} />
            <span>{CONTACT.location}</span>
          </div>
          <div className="about-card-divider" />
          <dl className="about-card-list">
            <div>
              <dt>Focus</dt>
              <dd>Web &amp; Mobile Backend</dd>
            </div>
            <div>
              <dt>Recent build</dt>
              <dd>
                Franchisync: A Business-to-Business Model Centralized Management
                System with Prescriptive Analysis for iFranchise - Capstone
                Project
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>React · Node.js · PostgreSQL</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
  return (
    <article className={`proj${project.featured ? " proj--featured" : ""}`}>
      <div className="proj-tab">
        <span className="proj-tab-dot" />
        <span className="proj-file">{project.file}</span>
        <span className="proj-status">{project.status}</span>
      </div>
      <div className="proj-body">
        <h3 className="proj-name">{project.name}</h3>
        <p className="proj-desc">{project.description}</p>
        <ul className="proj-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="proj-tech">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="proj-links">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
          >
            <GithubIcon size={16} />
            View Code
            <ExternalLink size={13} />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-link"
            >
              <ExternalLink size={16} />
              Live Site
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" file="projects/" label="Projects" alt>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
        <article className="proj proj--empty">
          <div className="proj-empty-inner">
            <FilePlus2 size={22} strokeWidth={1.6} />
            <p>More in progress</p>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

function SkillsSection() {
  return (
    <Section id="skills" file="skills.json" label="Skills">
      <div className="skills-grid">
        {SKILLS.map((group) => (
          <div key={group.group} className="skill-card">
            <div className="skill-card-head">
              <span className="skill-card-dot" />
              <span className="skill-card-file">{group.file}</span>
            </div>
            <h3 className="skill-card-title">{group.group}</h3>
            <div className="skill-card-chips">
              {group.items.map((item) => (
                <span key={item} className="chip chip--mono">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TimelineSection({ id, file, label, entries, alt, kind }) {
  const isEducation = kind === "education";

  return (
    <Section id={id} file={file} label={label} alt={alt}>
      <ol className="timeline">
        {entries.map((entry, i) => (
          <li className="timeline-item" key={i}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <span className="timeline-when">{entry.when}</span>
              <h3 className="timeline-title">
                {isEducation ? entry.where : entry.role}
              </h3>
              <p
                className={`timeline-where${isEducation ? " timeline-where--degree" : ""}`}
              >
                {isEducation ? entry.degree : entry.where}
              </p>
              <ul className="timeline-points">
                {entry.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSent(true);
  }, []);

  return (
    <Section id="contact" file="contact.sh" label="Contact" alt>
      <div className="contact-grid">
        <div className="contact-info">
          <h2 className="h2">Let's talk</h2>
          <p>
            Have a project, a role, or just a question about how the stock
            transfer logic works? My inbox is open.
          </p>
          <div className="contact-links">
            <a href={`mailto:${CONTACT.email}`} className="contact-link">
              <Mail size={16} strokeWidth={2} />
              {CONTACT.email}
            </a>
            <a href={CONTACT.github} className="contact-link">
              <GithubIcon size={16} strokeWidth={2} />
              GitHub
            </a>
            <a href={CONTACT.linkedin} className="contact-link">
              <LinkedinIcon size={16} strokeWidth={2} />
              LinkedIn
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-tab">
            <span className="proj-tab-dot" />
            <span className="proj-file">new_message.txt</span>
          </div>
          <div className="contact-form-body">
            <label className="field">
              <span>Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you building?"
              />
            </label>
            <button type="submit" className="btn btn--primary btn--full">
              {sent
                ? "Message ready — connect a backend to send it"
                : "Send message"}
              <Send size={15} strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function PortfolioApp() {
  const ids = SECTIONS.map((s) => s.id);
  const active = useActiveSection(ids);

  const handleNavigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="portfolio">
      <style>{CSS}</style>
      <FolderNav active={active} onNavigate={handleNavigate} />
      <main>
        <HomeSection onNavigate={handleNavigate} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection
          id="experience"
          file="experience.log"
          label="Experience"
          entries={EXPERIENCE}
          kind="experience"
        />
        <TimelineSection
          id="education"
          file="education.md"
          label="Education"
          entries={EDUCATION}
          alt
          kind="education"
        />
        <ContactSection />
      </main>
      <footer className="footer">
        <span>{NAME} — built as a folder, opened one file at a time.</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.portfolio {
  --bg: #12161d;
  --bg-alt: #171c25;
  --panel: #1b212b;
  --panel-raised: #212836;
  --border: #2b3342;
  --border-soft: #232a37;
  --text: #e7eaf0;
  --text-dim: #a3abba;
  --text-faint: #6b7385;
  --accent: #d1a446;
  --accent-soft: #d1a44622;
  --accent-strong: #e8bd63;
  --teal: #4f9d90;
  --radius-tab: 10px 10px 0 0;
  --radius-card: 10px;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.portfolio * { box-sizing: border-box; }
.portfolio h1, .portfolio h2, .portfolio h3 { font-family: var(--font-display); margin: 0; }
.portfolio p { margin: 0; color: var(--text-dim); }
.portfolio ul, .portfolio ol, .portfolio dl { margin: 0; padding: 0; list-style: none; }
.portfolio a { color: inherit; text-decoration: none; }
.portfolio button { font-family: inherit; cursor: pointer; }

@media (prefers-reduced-motion: reduce) {
  .portfolio * { animation: none !important; transition: none !important; }
}

/* ---------- Nav ---------- */
.fn {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 14px 20px 0;
  background: linear-gradient(180deg, var(--bg) 60%, transparent);
}
.fn-rail {
  display: flex;
  gap: 4px;
  max-width: 1280px;
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0;
}
.fn-rail::-webkit-scrollbar { display: none; }
.fn-shelf {
  height: 2px;
  background: var(--border);
  max-width: 1280px;
  margin: 0 auto;
}
.fn-tab {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: var(--radius-tab);
  color: var(--text-faint);
  font-size: 13px;
  transform: translateY(4px);
  transition: transform 0.18s ease, color 0.18s ease, background 0.18s ease;
}
.fn-tab:hover { color: var(--text-dim); transform: translateY(1px); }
.fn-tab.is-active {
  background: var(--bg);
  color: var(--accent-strong);
  border-color: var(--border);
  border-bottom: 1px solid var(--bg);
  transform: translateY(0);
  z-index: 2;
}
.fn-tab-icon { flex: 0 0 auto; }
.fn-tab-label { font-weight: 500; white-space: nowrap; }
.fn-tab-file {
  display: none;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  white-space: nowrap;
}
.fn-tab.is-active .fn-tab-file { display: inline; color: var(--accent); }

/* ---------- Layout helpers ---------- */
.h2 {
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 14px;
}
.section {
  padding: 72px 20px 84px;
  scroll-margin-top: 64px;
}
.section--alt { background: var(--bg-alt); }
.section-inner {
  max-width: 1080px;
  margin: 0 auto;
}
.file-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 34px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
}
.file-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex: 0 0 auto; }
.file-name { color: var(--text-dim); }
.file-label { color: var(--text-faint); }
.file-label::before { content: "// "; }
.section-body { border-left: 2px solid var(--border-soft); padding-left: 24px; }

@media (max-width: 640px) {
  .section { padding: 56px 16px 64px; }
  .section-body { padding-left: 16px; }
}

/* ---------- Buttons / chips ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}
.btn--primary { background: var(--accent); color: #1a1406; }
.btn--primary:hover { transform: translateY(-1px); background: var(--accent-strong); }
.btn--ghost { background: transparent; border-color: var(--border); color: var(--text); }
.btn--ghost:hover { border-color: var(--accent); color: var(--accent-strong); }
.btn--full { width: 100%; justify-content: center; }

.chip {
  display: inline-flex;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  background: var(--panel-raised);
  border: 1px solid var(--border);
  color: var(--text-dim);
}
.chip--mono { font-family: var(--font-mono); font-size: 11.5px; }

/* ---------- Hero ---------- */
.hero {
  padding: 56px 20px 80px;
  border: 1px solid var(--border);
}
.hero-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
}
  .hero, .hero-copy { text-align: left; }
.portfolio .hero-kicker {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--teal);
  margin: 0 0 28px;
}

.portfolio .hero-name {
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}
.hero-cursor {
  width: 3px;
  height: 0.85em;
  background: var(--accent);
  margin-left: 6px;
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.portfolio .hero-role {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 15px;
  margin: 24px 0 0;
}

.portfolio .hero-tagline {
  margin: 16px 0 0;
  max-width: 46ch;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-dim);
}
.hero-actions { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }

.hero-frame {
  position: relative;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 16px;
  transform: rotate(1.2deg);
}
.hero-tab {
  position: absolute;
  top: -22px;
  left: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 6px 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
}
.hero-avatar {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  background: var(--panel-raised);
}

.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.hero-avatar span {
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 700;
  color: var(--accent-strong);
}
.hero-frame-footer { display: flex; gap: 6px; margin-top: 14px; }
.hero-frame-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }

@media (max-width: 860px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-frame { max-width: 280px; }
}

/* ---------- About ---------- */
.about-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
}
.about-text p { margin-top: 14px; }
.about-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 22px;
  height: fit-content;
}
.about-card-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-dim);
}
.about-card-divider { height: 1px; background: var(--border-soft); margin: 16px 0; }
.about-card-list div { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; }
.about-card-list dt { color: var(--text-faint); font-size: 12.5px; }
.about-card-list dd { color: var(--text); font-size: 13px; font-family: var(--font-mono); text-align: right; }

@media (max-width: 780px) {
  .about-grid { grid-template-columns: 1fr; }
}

/* ---------- Projects ---------- */
.proj-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.proj {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: transform 0.18s ease, border-color 0.18s ease;
  display: flex;
  flex-direction: column;
}
.proj:hover { transform: translateY(-3px); border-color: var(--accent); }
.proj--featured { grid-column: span 2; }
.proj-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--panel-raised);
  border-bottom: 1px solid var(--border-soft);
  font-family: var(--font-mono);
  font-size: 11.5px;
}
.proj-tab-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); flex: 0 0 auto; }
.proj-file { color: var(--text-dim); }
.proj-status { margin-left: auto; color: var(--text-faint); }
.proj-body { padding: 18px 20px 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.proj-name { font-size: 1.2rem; font-weight: 600; }
.proj-desc { font-size: 14px; }
.proj-highlights { display: flex; flex-direction: column; gap: 6px; }
.proj-highlights li {
  font-size: 13px;
  color: var(--text-dim);
  padding-left: 14px;
  position: relative;
}
.proj-highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}
.proj-tech { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.proj-links { display: flex; gap: 16px; margin-top: 6px; }
.proj-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-dim); }
.proj-link:hover { color: var(--accent-strong); }

.proj--empty {
  border-style: dashed;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}
.proj-empty-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-faint);
  text-align: center;
  padding: 24px;
}
.proj-empty-inner p { color: var(--text-dim); font-weight: 500; margin: 0; }
.proj-empty-inner span { font-family: var(--font-mono); font-size: 12px; }

@media (max-width: 780px) {
  .proj--featured { grid-column: span 1; }
}

/* ---------- Skills ---------- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.skill-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 18px;
}
.skill-card-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.skill-card-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
.skill-card-file { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.skill-card-title { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
.skill-card-chips { display: flex; flex-wrap: wrap; gap: 6px; }

/* ---------- Timeline ---------- */
.timeline { display: flex; flex-direction: column; gap: 30px; }
.timeline-item { display: grid; grid-template-columns: 14px 1fr; gap: 18px; }
.timeline-marker {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--panel);
  border: 2px solid var(--accent);
  margin-top: 4px;
}
.timeline-when { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
.timeline-title { font-size: 1.1rem; font-weight: 600; margin-top: 4px; }
.timeline-where { font-size: 13px; color: var(--text-faint); margin-top: 2px; }
.timeline-points { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
.timeline-points li {
  font-size: 13.5px;
  color: var(--text-dim);
  padding-left: 14px;
  position: relative;
}
.timeline-points li::before {
  content: "";
  position: absolute; left: 0; top: 8px;
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--teal);
}

/* ---------- Contact ---------- */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
}
.contact-info p { margin-top: 12px; max-width: 42ch; }
.contact-links { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.contact-link { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-dim); width: fit-content; }
.contact-link:hover { color: var(--accent-strong); }

.contact-form {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}
.contact-form-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px;
  background: var(--panel-raised);
  border-bottom: 1px solid var(--border-soft);
  font-family: var(--font-mono);
  font-size: 11.5px;
}
.contact-form-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-faint); }
.field input, .field textarea {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 12px;
  resize: vertical;
}
.field input:focus, .field textarea:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

@media (max-width: 780px) {
  .contact-grid { grid-template-columns: 1fr; }
}

/* ---------- Footer ---------- */
.footer {
  text-align: center;
  padding: 32px 20px 48px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
}
`;
