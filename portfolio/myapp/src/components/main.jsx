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

/* ---------- Pixel art ---------- */
const PAL = {
  y: "#f4d03f",
  q: "#d9a93a",
  r: "#f2784b",
  p: "#e9a8da",
  w: "#fdf6ff",
  k: "#2a1c2e",
  b: "#4aa8e0",
  e: "#2c6fb0",
  g: "#a9a4b5",
  d: "#6c6678",
  G: "#1f7a4d",
  l: "#5fd37a",
  n: "#8a5a3a",
  f: "#f58a3a",
  v: "#b69cf0",
  o: "#f2a65a",
  u: "#7a73e0",
};
const ART = {
  moon: [
    "....yyyy....",
    "..yyyyyyyy..",
    ".yyyyyyyyyy.",
    "yyyyyqyyyyyy",
    "yyyyyyyyyyqy",
    "yyqyyyyyyyyy",
    "yyyyyyyyqyyy",
    "yyyyyyyyyyyy",
    ".yyyyyyyyyy.",
    "..yyyyyyyy..",
    "....yyyy....",
  ],
  cat: [
    "v.v.........",
    "vvv......v..",
    "vkvkvvvvvvv.",
    "vvvvvvvvvvv.",
    ".vvvvvvvvvv.",
    ".vv......vv.",
  ],
  cloud: [
    "....oooo......",
    "..oooooooooo..",
    ".oooooooooooo.",
    "uuuuuuuuuuuuuu",
    ".uuuuuuuuuuuu.",
  ],
  icicle: [
    "bbbbbbbb",
    "bbwbbbbb",
    "bbwbbbbe",
    ".bwbbbbe",
    ".bbbbbe.",
    "..bbbbe.",
    "..bwbbe.",
    "...bbe..",
    "...bwe..",
    "....be..",
    "....be..",
    "....b...",
  ],
  skull: [
    ".wwwwwwww.",
    "wwwwwwwwww",
    "wwrrwwrrww",
    "wwrrwwrrww",
    "wwwwwwwwww",
    ".wwwddwww.",
    "..wwwwww..",
    "..wdwdwd..",
  ],
  tower: [
    "....ffff....",
    "...fyyyyf...",
    "..gggggggg..",
    "..gdgdgdgd..",
    "..gggggggg..",
    "..gggddggg..",
    "..ggdkkdgg..",
    "..ggdkkdgg..",
    "..gggddggg..",
    "..gggggggg..",
    "..gggggggg..",
    "..gddgggdg..",
    "..gggggggg..",
    "..gggggggg..",
    "..gggggggg..",
    "..gggggggg..",
  ],
  tree: [
    "....GGGGGG....",
    "..GGGllGGGGG..",
    ".GGllGGGGlGGG.",
    "GGGGGGGllGGGGG",
    "GlGGGGGGGGGlGG",
    ".GGGGGGGGGGGG.",
    "..GGGGnnGGGG..",
    "......nn......",
    "......nn......",
  ],
  flower: [
    "..yyy..",
    ".yynyy.",
    ".yynyy.",
    "..yyy..",
    "...l...",
    "..ll...",
    "...l...",
  ],
  heart: [".rr.rr.", "rrrrrrr", "rrrrrrr", ".rrrrr.", "..rrr..", "...r..."],
  gem: ["..ppp..", ".pwwwp.", "ppppppp", ".ppppp.", "..ppp..", "...p..."],
};
function Sprite({ art, px = 4, className = "" }) {
  const rows = ART[art];
  const rects = [];
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (PAL[c])
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="1"
            height="1"
            fill={PAL[c]}
          />,
        );
    }),
  );
  return (
    <svg
      className={`sprite ${className}`}
      width={rows[0].length * px}
      height={rows.length * px}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}
const [FIRST_NAME, ...REST_NAME] = NAME.split(" ");
const LAST_NAME = REST_NAME.join(" ");

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
      <div className="stage" aria-hidden="true">
        <Sprite art="moon" px={5} className="s-moon" />
        <Sprite art="cat" px={4} className="s-cat" />
        <Sprite art="cloud" px={5} className="s-cloud1" />
        <Sprite art="cloud" px={5} className="s-cloud2" />
        <Sprite art="icicle" px={5} className="s-ice1" />
        <Sprite art="icicle" px={5} className="s-ice2" />
        <Sprite art="skull" px={5} className="s-skull" />
        <Sprite art="tower" px={6} className="s-tower" />
        <Sprite art="tree" px={6} className="s-tree" />
        <Sprite art="flower" px={4} className="s-flower1" />
        <Sprite art="flower" px={4} className="s-flower2" />
      </div>
      <div className="hero-inner">
        <p className="hero-kicker">
          <i className="coin" />
          open for opportunities
          <i className="coin" />
        </p>
        <div className="hero-title">
          <div className="hero-avatar">
            <img src="/profile.jpg" alt={NAME} className="hero-photo" />
          </div>
          <h1 className="hero-name" aria-label={NAME}>
            <span>{FIRST_NAME}</span>
            <span>{LAST_NAME}</span>
          </h1>
        </div>
        <p className="hero-role">{ROLE}</p>
        <p className="hero-tagline">{TAGLINE}</p>
        <div className="hero-actions">
          <button
            className="btn btn--primary"
            onClick={() => onNavigate("projects")}
          >
            Projects
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => onNavigate("contact")}
          >
            Contact
          </button>
          <button className="btn btn--gold" onClick={() => onNavigate("about")}>
            About
          </button>
        </div>
        <div className="hud" aria-hidden="true">
          <div className="hud-row">
            {[0, 1, 2, 3, 4].map((i) => (
              <Sprite key={i} art="heart" px={3} />
            ))}
          </div>
          <div className="hud-row">
            {[0, 1, 2, 3, 4].map((i) => (
              <Sprite key={i} art="gem" px={3} />
            ))}
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
        <span>{NAME} — thanks for playing.</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&display=swap');

.portfolio {
  --bg: #3a2838; --panel: #2f2031; --panel-hi: #3d2b40;
  --line: #f6f0e2; --line-soft: #6d5470;
  --text: #f6f0e2; --text-dim: #d3c6d6; --text-faint: #a493aa;
  --yellow: #f4b942; --yellow-lo: #d98f2b; --blue: #5d79c9; --blue-lo: #3f58a8;
  --gold: #c9a23c; --pink: #d25aa8; --teal: #6fd3bd; --ink: #1d1220;
  --px: 'Press Start 2P', monospace;
  --display: 'Rubik Mono One', sans-serif;
  --body: 'Pixelify Sans', sans-serif;
  position: relative; min-height: 100vh; overflow-x: clip;
  background: var(--bg); color: var(--text);
  font-family: var(--body); font-size: 17px; line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
/* neon grid floor */
.portfolio::before {
  content: ""; position: fixed; left: -60%; right: -60%; bottom: 0; height: 58vh;
  background-image: linear-gradient(var(--pink) 2px, transparent 2px), linear-gradient(90deg, var(--pink) 2px, transparent 2px);
  background-size: 64px 64px; background-position: center bottom;
  transform: perspective(380px) rotateX(62deg); transform-origin: 50% 100%;
  opacity: .38; pointer-events: none; z-index: 0;
  -webkit-mask-image: linear-gradient(to top, #000 30%, transparent);
  mask-image: linear-gradient(to top, #000 30%, transparent);
}
.portfolio * { box-sizing: border-box; }
.portfolio h1, .portfolio h2, .portfolio h3 { margin: 0; font-weight: 400; }
.portfolio p { margin: 0; color: var(--text-dim); }
.portfolio ul, .portfolio ol, .portfolio dl { margin: 0; padding: 0; list-style: none; }
.portfolio a { color: inherit; text-decoration: none; }
.portfolio button { font-family: inherit; cursor: pointer; }
.portfolio main, .portfolio .footer { position: relative; z-index: 1; }
.portfolio :focus-visible { outline: 3px solid var(--teal); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .portfolio * { animation: none !important; transition: none !important; } }

/* ---------- Nav: pill buttons ---------- */
.fn { position: sticky; top: 0; z-index: 50; padding: 12px 16px 8px; background: linear-gradient(180deg, var(--bg) 70%, transparent); }
.fn-rail { display: flex; gap: 10px; width: fit-content; max-width: 100%; margin: 0 auto; overflow-x: auto; scrollbar-width: none; padding: 4px 3px 8px; }
.fn-rail::-webkit-scrollbar { display: none; }
.fn-shelf, .fn-tab-icon, .fn-tab-file { display: none; }
.fn-tab {
  flex: 0 0 auto; padding: 11px 18px; border: 0; border-radius: 999px;
  background: linear-gradient(180deg, #7a92dc, var(--blue)); color: #fff;
  font-family: var(--px); font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
  box-shadow: inset 0 -4px 0 var(--blue-lo), 0 0 0 2px var(--ink); transition: transform .12s;
}
.fn-tab:hover { transform: translateY(-2px); }
.fn-tab.is-active { background: linear-gradient(180deg, #ffd777, var(--yellow)); color: var(--ink); box-shadow: inset 0 -4px 0 var(--yellow-lo), 0 0 0 2px var(--ink); }

/* ---------- Frames ---------- */
.section { padding: 36px 16px 48px; scroll-margin-top: 74px; }
.section-inner { max-width: 1040px; margin: 0 auto; padding: 30px 34px 36px; border: 2px solid var(--line); border-radius: 28px; background: rgba(47,32,49,.92); }
.file-header { display: flex; justify-content: center; margin-bottom: 28px; }
.file-dot, .file-name { display: none; }
.file-label { display: inline-flex; align-items: center; gap: 12px; font-family: var(--px); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--text); }
.file-label::before, .file-label::after { content: ""; width: 8px; height: 14px; border-radius: 5px; background: var(--yellow); box-shadow: inset -3px 0 0 var(--yellow-lo); }
.portfolio .h2 { font-family: var(--display); font-size: clamp(1.15rem, 2.4vw, 1.55rem); line-height: 1.3; margin-bottom: 14px; }

/* ---------- Buttons / chips ---------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 26px;
  border: 0; border-radius: 999px; color: var(--ink);
  font-family: var(--px); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  box-shadow: inset 0 -4px 0 rgba(0,0,0,.25), 0 0 0 2px var(--ink); transition: transform .12s;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(1px); }
.btn--primary { background: linear-gradient(180deg, #ffd777, var(--yellow)); }
.btn--ghost { background: linear-gradient(180deg, #7a92dc, var(--blue)); color: #fff; }
.btn--gold { background: linear-gradient(180deg, #dcbb55, var(--gold)); }
.btn--full { width: 100%; }
.chip { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 14px; background: var(--panel-hi); border: 2px solid var(--line-soft); color: var(--text-dim); }

/* ---------- Hero title screen ---------- */
.hero { position: relative; z-index: 1; min-height: calc(100vh - 70px); display: flex; align-items: center; padding: 44px 16px 56px; }
.hero-inner { position: relative; width: 100%; max-width: 980px; margin: 0 auto; padding: 56px 48px 40px; border: 2px solid var(--line); border-radius: 36px; background: rgba(47,32,49,.9); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 20px; }
.portfolio .hero-kicker { display: flex; align-items: center; gap: 12px; font-family: var(--px); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text); }
.coin { width: 8px; height: 16px; border-radius: 5px; background: var(--yellow); box-shadow: inset -3px 0 0 var(--yellow-lo); }
.hero-title { display: flex; align-items: center; justify-content: center; gap: 28px; }
.hero-avatar { flex: 0 0 auto; width: 112px; height: 112px; overflow: hidden; border: 4px solid var(--ink); outline: 2px solid var(--line); background: var(--panel-hi); box-shadow: 6px 6px 0 var(--ink); }
.hero-photo { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.portfolio .hero-name { display: flex; flex-direction: column; align-items: flex-start; font-family: var(--display); line-height: 1; text-align: left; color: var(--text); text-shadow: 4px 4px 0 var(--ink); }
.hero-name span:first-child { font-size: clamp(2.6rem, 8vw, 5.6rem); }
.hero-name span:last-child { font-size: clamp(1rem, 3vw, 2rem); margin-top: 10px; color: var(--yellow); }
.portfolio .hero-role { font-family: var(--px); font-size: 12px; letter-spacing: .08em; line-height: 1.8; text-transform: uppercase; color: var(--teal); }
.portfolio .hero-tagline { max-width: 52ch; font-size: 19px; }
.hero-actions { display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
.hud { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 18px; }
.hud-row { display: flex; gap: 6px; }

.stage { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.stage .sprite { position: absolute; image-rendering: pixelated; }
.s-moon { top: 3%; left: 30%; } .s-cat { top: 2%; right: 34%; }
.s-cloud1 { top: 22%; left: 1%; } .s-cloud2 { top: 8%; right: 2%; }
.s-ice1 { top: 5%; left: 12%; } .s-ice2 { top: 5%; right: 15%; }
.s-skull { top: 44%; left: 2%; }
.s-tower { bottom: 4%; right: 4%; } .s-tree { bottom: 3%; left: 3%; }
.s-flower1 { bottom: 2%; left: 36%; } .s-flower2 { bottom: 2%; right: 32%; }
@media (max-width: 980px) { .s-cloud1, .s-skull, .s-cat, .s-flower1, .s-flower2, .s-ice2 { display: none; } }
@media (max-width: 700px) {
  .stage { display: none; }
  .hero-inner { padding: 40px 22px 28px; }
  .hero-title { flex-direction: column; gap: 18px; }
  .portfolio .hero-name { align-items: center; text-align: center; }
}

/* ---------- Cards ---------- */
.about-card, .proj, .skill-card, .contact-form { background: var(--panel); border: 2px solid var(--line-soft); border-radius: 14px; box-shadow: 5px 5px 0 var(--ink); }
.about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px; align-items: start; }
.about-text p { margin-top: 14px; font-size: 18px; }
.about-card { padding: 20px; }
.about-card-row { display: flex; align-items: center; gap: 8px; color: var(--teal); }
.about-card-divider { height: 2px; background: var(--line-soft); margin: 14px 0; }
.about-card-list div { display: flex; flex-direction: column; gap: 2px; padding: 8px 0; }
.about-card-list dt { font-family: var(--px); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; color: var(--yellow); }
.about-card-list dd { font-size: 16px; color: var(--text); }

.proj-grid { display: flex; flex-direction: column; gap: 24px; }
.proj { overflow: hidden; display: flex; flex-direction: column; transition: transform .12s, box-shadow .12s, border-color .12s; }
.proj:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--ink); border-color: var(--yellow); }
.proj-tab, .contact-form-tab { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: var(--panel-hi); border-bottom: 2px solid var(--line-soft); font-family: var(--px); font-size: 9px; letter-spacing: .06em; }
.proj-tab-dot { width: 8px; height: 8px; background: var(--yellow); flex: 0 0 auto; }
.proj-file { color: var(--text-dim); }
.proj-status { margin-left: auto; color: var(--teal); }
.proj-body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.proj-name { font-family: var(--display); font-size: 1.25rem; }
.proj-desc { font-size: 16px; }
.proj-highlights, .timeline-points { display: flex; flex-direction: column; gap: 6px; }
.proj-highlights li, .timeline-points li { position: relative; padding-left: 20px; font-size: 16px; color: var(--text-dim); }
.proj-highlights li::before, .timeline-points li::before { content: ""; position: absolute; left: 0; top: 8px; width: 8px; height: 8px; background: var(--yellow); }
.proj-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.proj-links { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 6px; }
.proj-link { display: inline-flex; align-items: center; gap: 6px; font-size: 16px; color: var(--teal); }
.proj-link:hover { color: var(--yellow); }
.proj--empty { border-style: dashed; align-items: center; justify-content: center; min-height: 150px; box-shadow: none; }
.proj--empty:hover { transform: none; box-shadow: none; border-color: var(--line-soft); }
.proj-empty-inner { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px; color: var(--text-faint); }
.proj-empty-inner p { font-family: var(--px); font-size: 10px; }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.skill-card { padding: 18px; }
.skill-card-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.skill-card-dot { width: 8px; height: 8px; background: var(--pink); }
.skill-card-file { font-family: var(--px); font-size: 8px; color: var(--text-faint); }
.skill-card-title { font-family: var(--px); font-size: 12px; margin-bottom: 12px; color: var(--yellow); }
.skill-card-chips { display: flex; flex-wrap: wrap; gap: 8px; }

/* ---------- Timeline ---------- */
.timeline { display: flex; flex-direction: column; gap: 28px; }
.timeline-item { display: grid; grid-template-columns: 16px 1fr; gap: 18px; }
.timeline-marker { width: 16px; height: 16px; margin-top: 6px; background: var(--yellow); box-shadow: 0 0 0 3px var(--ink), 0 0 0 5px var(--line); }
.timeline-when { font-family: var(--px); font-size: 10px; color: var(--teal); }
.timeline-title { font-family: var(--display); font-size: 1.05rem; margin-top: 8px; }
.portfolio .timeline-where { font-size: 16px; margin-top: 2px; color: var(--text-faint); }
.timeline-points { margin-top: 12px; }

/* ---------- Contact ---------- */
.contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 32px; }
.contact-info p { margin-top: 12px; max-width: 42ch; font-size: 18px; }
.contact-links { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.contact-link { display: inline-flex; align-items: center; gap: 10px; width: fit-content; font-size: 17px; color: var(--teal); }
.contact-link:hover { color: var(--yellow); }
.contact-form { overflow: hidden; }
.contact-form-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; font-family: var(--px); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; color: var(--yellow); }
.field input, .field textarea { font-family: var(--body); font-size: 17px; letter-spacing: 0; text-transform: none; color: var(--text); background: var(--bg); border: 2px solid var(--line-soft); border-radius: 8px; padding: 10px 12px; resize: vertical; }
.field input:focus, .field textarea:focus { outline: 3px solid var(--teal); outline-offset: 1px; border-color: var(--teal); }

.footer { text-align: center; padding: 28px 16px 56px; font-family: var(--px); font-size: 10px; line-height: 1.8; color: var(--text-faint); }

@media (max-width: 780px) {
  .about-grid, .contact-grid { grid-template-columns: 1fr; }
  .section-inner { padding: 24px 18px 28px; }
}
`;
