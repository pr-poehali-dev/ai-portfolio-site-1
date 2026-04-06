import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "tools", label: "Tools" },
  { id: "music", label: "Music" },
  { id: "teaching", label: "Teaching" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    period: "2020 — 2022",
    title: "Freelance",
    items: [
      "First experiments with AI and generative content",
      "Early adoption of ChatGPT for creative workflows",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Commercial AI Projects",
    items: [
      "Product visuals for Etsy (carpets, wallpapers)",
      "Managing three e-commerce stores simultaneously",
      "AI-generated imagery for product listings",
    ],
  },
  {
    period: "2025",
    title: "xLabs — Belarus",
    items: [
      "Animated film «Belovezhskaya Pushcha»",
      "Storyboarding and visual concept development",
      "7 months of in-house team collaboration",
    ],
  },
];

const CLIENT_WORK = [
  "Cosmetic brand website design",
  "Furniture and carpet visual production",
  "AI content for sportswear collections",
  "Experimental visual concepts & art direction",
];

const TOOLS_PRIMARY = ["ChatGPT", "Gemini 3", "Higgsfield"];
const TOOLS_SECONDARY = ["MidJourney", "Kling", "Sora", "Grok", "Stable Diffusion"];

const MUSIC_PROJECTS = [
  { name: "Project I", desc: "Full album on Yandex Music", link: "#" },
  { name: "Project II", desc: "Full album on Yandex Music", link: "#" },
  { name: "Project III", desc: "Full album on Yandex Music", link: "#" },
];

const PUBLICATIONS = [
  { title: "AI Photography — Fashion Editorial", outlet: "Magazine / Platform", year: "2024" },
  { title: "Digital Art & Generative Visuals", outlet: "Online Feature", year: "2024" },
  { title: "Narrative Through AI", outlet: "Art Publication", year: "2023" },
];

function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const handler = () => {
      const ids = ["hero", ...NAV_ITEMS.map((n) => n.id)];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 80 && bottom > 80) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`d-section ${inView ? "d-section--visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="d-root">

      {/* NAV */}
      <header className={`d-nav ${loaded ? "d-nav--in" : ""}`}>
        <button className="d-nav__logo" onClick={() => scrollTo("hero")}>
          D·R
        </button>
        <nav className={`d-nav__links ${menuOpen ? "d-nav__links--open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`d-nav__link ${active === item.id ? "d-nav__link--active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className="d-nav__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={menuOpen ? "open" : ""} />
          <span className={menuOpen ? "open" : ""} />
        </button>
      </header>

      {/* HERO */}
      <section id="hero" className="d-hero">
        <div className={`d-hero__inner ${loaded ? "d-hero--in" : ""}`}>
          <p className="d-hero__role">
            AI Content Creator&nbsp;&nbsp;·&nbsp;&nbsp;AI Artist&nbsp;&nbsp;·&nbsp;&nbsp;Narrative Designer&nbsp;&nbsp;·&nbsp;&nbsp;AI Music Producer
          </p>
          <h1 className="d-hero__name">
            Rimma<br />
            Rovitch<br />
            <em>Darya</em>
          </h1>
          <p className="d-hero__desc">
            I create visuals, narratives, music and digital<br />
            experiences using AI — from fashion and product<br />
            design to animation, games and music.
          </p>
        </div>
        <button className="d-hero__down" onClick={() => scrollTo("about")}>
          scroll ↓
        </button>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">About Me</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">
                At the intersection of<br />art, design and technology
              </h2>
              <p className="d-body">
                I've been working with neural networks since 2022 — from the moment
                of their mass emergence. Since 2020, I actively use ChatGPT and
                immediately began applying AI in commercial and artistic projects.
              </p>
              <p className="d-body">
                I work at the intersection of art, design, narrative and technology.
                My practice spans visual creation, storytelling, music production
                and digital world-building — all through the lens of artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" className="d-bg-off">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">Experience</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">Career</h2>
              <div className="d-timeline">
                {EXPERIENCE.map((item, i) => (
                  <div key={i} className="d-timeline__item">
                    <div className="d-timeline__period">{item.period}</div>
                    <div className="d-timeline__content">
                      <div className="d-timeline__title">{item.title}</div>
                      <ul className="d-timeline__list">
                        {item.items.map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WORK */}
      <Section id="work">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">Work</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">Outsource & Client Work</h2>
              <ul className="d-work-list">
                {CLIENT_WORK.map((item, i) => (
                  <li key={i} className="d-work-item">
                    <span className="d-work-idx">0{i + 1}</span>
                    <span className="d-work-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="d-rule" />

              <h3 className="d-h3">Publications</h3>
              <div className="d-pubs">
                {PUBLICATIONS.map((pub, i) => (
                  <div key={i} className="d-pub">
                    <div>
                      <div className="d-pub__title">{pub.title}</div>
                      <div className="d-pub__outlet">{pub.outlet}</div>
                    </div>
                    <div className="d-pub__year">{pub.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TOOLS */}
      <Section id="tools" className="d-bg-off">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">Tools</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">AI Tools I Work With</h2>
              <div className="d-tools-block">
                <div className="d-tools-group-label">Primary</div>
                <div className="d-tools-row">
                  {TOOLS_PRIMARY.map((t) => (
                    <span key={t} className="d-tool d-tool--bold">{t}</span>
                  ))}
                </div>
              </div>
              <div className="d-tools-block">
                <div className="d-tools-group-label">Additional</div>
                <div className="d-tools-row">
                  {TOOLS_SECONDARY.map((t) => (
                    <span key={t} className="d-tool">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MUSIC */}
      <Section id="music">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">Music</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">AI Music Projects</h2>
              <p className="d-body">
                AI musician, creator and producer. Three independent music projects,
                each with a full album release on Yandex Music.
              </p>
              <div className="d-music-list">
                {MUSIC_PROJECTS.map((proj, i) => (
                  <div key={i} className="d-music-item">
                    <div>
                      <div className="d-music-name">{proj.name}</div>
                      <div className="d-music-desc">{proj.desc}</div>
                    </div>
                    <a href={proj.link} className="d-music-btn">Listen →</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TEACHING */}
      <Section id="teaching" className="d-bg-off">
        <div className="d-container">
          <div className="d-row">
            <div className="d-row__label">
              <span className="d-label">Teaching</span>
            </div>
            <div className="d-row__body">
              <h2 className="d-h2">Teaching & Mentorship</h2>
              <p className="d-body">
                Lead instructor of a Narrative Design course.
                Five years in game development as a narrative designer.
              </p>
              <p className="d-body">Course curriculum includes:</p>
              <ul className="d-teach-list">
                <li>Generating visuals and environments through AI</li>
                <li>Creating characters, backgrounds and design systems</li>
                <li>Working with AI-generated music</li>
                <li>Building coherent worlds and narratives</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" className="d-contact">
        <div className="d-container">
          <h2 className="d-contact-title">Get in touch</h2>
          <div className="d-contact-grid">
            <a href="mailto:hello@example.com" className="d-contact-item">
              <span className="d-contact-type">Email</span>
              <span className="d-contact-val">hello@example.com</span>
            </a>
            <a href="#" className="d-contact-item">
              <span className="d-contact-type">Behance</span>
              <span className="d-contact-val">Portfolio →</span>
            </a>
            <a href="#" className="d-contact-item">
              <span className="d-contact-type">Yandex Music</span>
              <span className="d-contact-val">3 Projects →</span>
            </a>
            <a href="#" className="d-contact-item">
              <span className="d-contact-type">Telegram</span>
              <span className="d-contact-val">@username</span>
            </a>
          </div>
          <div className="d-contact-footer">
            <span>© 2025 Darya Rimarovich</span>
            <button className="d-back-top" onClick={() => scrollTo("hero")}>↑ Top</button>
          </div>
        </div>
      </section>

    </div>
  );
}
