import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const projects = [
  {
    id: 1,
    title: "Neural Portraits",
    category: "AI Art / Midjourney",
    year: "2024",
    description: "Серия портретов, созданных с помощью нейросетей. Исследование границ между реальностью и цифровым искусством.",
    tags: ["Midjourney", "Stable Diffusion", "Art Direction"],
    accent: "#c8a96e",
    image: "https://images.unsplash.com/photo-1658989044538-defae83a92c0?w=800&q=80",
  },
  {
    id: 2,
    title: "Brand Identity 2.0",
    category: "AI Branding / DALL·E",
    year: "2024",
    description: "Разработка визуальных идентичностей для брендов с использованием generative AI-инструментов.",
    tags: ["DALL·E 3", "Adobe Firefly", "Brand Design"],
    accent: "#8eb4c8",
    image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=800&q=80",
  },
  {
    id: 3,
    title: "Motion Stories",
    category: "AI Video / Runway",
    year: "2023",
    description: "Короткометражные видео-нарративы, сгенерированные с помощью Runway ML и Pika Labs.",
    tags: ["Runway", "Pika Labs", "Video AI"],
    accent: "#b8c8a9",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  },
  {
    id: 4,
    title: "Type & Texture",
    category: "AI Typography / Adobe",
    year: "2023",
    description: "Типографические эксперименты на пересечении AI-генерации и ручного дизайна.",
    tags: ["Adobe Firefly", "Canva AI", "Typography"],
    accent: "#c8a9b8",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
];

const skills = [
  "Midjourney", "Stable Diffusion", "DALL·E 3", "Runway ML",
  "Pika Labs", "Adobe Firefly", "Sora", "Kling AI", "CapCut AI", "ChatGPT",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pf-root">
      {/* NAV */}
      <nav className={`pf-nav ${loaded ? "pf-nav--visible" : ""}`}>
        <button className="pf-logo" onClick={() => scrollTo("home")}>
          AI·CREATOR
        </button>
        <div className={`pf-nav-links ${menuOpen ? "pf-nav-links--open" : ""}`}>
          {[
            { id: "home", label: "Главная" },
            { id: "about", label: "О мне" },
            { id: "projects", label: "Проекты" },
            { id: "contacts", label: "Контакты" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`pf-nav-link ${activeSection === item.id ? "pf-nav-link--active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="pf-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="pf-hero" ref={heroRef}>
        <div className={`pf-hero__left ${loaded ? "pf-anim--in" : ""}`}>
          <div className="pf-eyebrow">AI Content Creator</div>
          <h1 className="pf-hero-title">
            Создаю<br />
            <em className="pf-hero-em">визуальные</em><br />
            миры с AI
          </h1>
          <p className="pf-hero-desc">
            Нейросети как инструмент творчества — генеративное искусство,
            брендинг, видео и типографика нового поколения.
          </p>
          <div className="pf-hero-btns">
            <button className="pf-btn pf-btn--primary" onClick={() => scrollTo("projects")}>
              Смотреть проекты
            </button>
            <button className="pf-btn pf-btn--ghost" onClick={() => scrollTo("contacts")}>
              Связаться
            </button>
          </div>
        </div>

        <div className={`pf-hero__right ${loaded ? "pf-anim--in pf-anim--delay" : ""}`}>
          <div className="pf-hero-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=90"
              alt="AI Art"
              className="pf-hero-img"
            />
            <div className="pf-hero-img-grad" />
          </div>
          <div className="pf-available-badge">
            <span className="pf-dot" />
            Открыт для проектов
          </div>
        </div>

        <button className="pf-scroll-hint" onClick={() => scrollTo("about")}>
          <Icon name="ArrowDown" size={18} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="pf-about">
        <div className="pf-container">
          <div className="pf-about-grid">
            <div className="pf-about-text">
              <div className="pf-eyebrow">О мне</div>
              <h2 className="pf-section-title">
                На стыке технологий<br />и творчества
              </h2>
              <p className="pf-body-text">
                Работаю с AI-инструментами с 2022 года. Создаю контент, который
                сложно отличить от реального — и в этом весь смысл. Генеративные
                нейросети позволяют мне воплощать идеи, которые раньше требовали
                целых команд.
              </p>
              <p className="pf-body-text">
                Специализируюсь на Midjourney, Stable Diffusion, Runway ML и
                других ведущих платформах. Помогаю брендам и творческим людям
                найти свой визуальный язык в эпоху AI.
              </p>
              <div className="pf-skills">
                {skills.map((skill) => (
                  <span key={skill} className="pf-skill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="pf-about-visual">
              <div className="pf-about-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1684779847639-fbcc7a6a98fb?w=700&q=85"
                  alt="About"
                  className="pf-about-img"
                />
              </div>
              <div className="pf-stats">
                <div className="pf-stat">
                  <span className="pf-stat-num">80+</span>
                  <span className="pf-stat-label">Проектов</span>
                </div>
                <div className="pf-stat">
                  <span className="pf-stat-num">2+</span>
                  <span className="pf-stat-label">Года опыта</span>
                </div>
                <div className="pf-stat">
                  <span className="pf-stat-num">10+</span>
                  <span className="pf-stat-label">AI-инструментов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="pf-projects">
        <div className="pf-container">
          <div className="pf-section-header">
            <div className="pf-eyebrow">Проекты</div>
            <h2 className="pf-section-title">Избранные работы</h2>
          </div>

          <div className="pf-projects-grid">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`pf-card ${i % 3 === 0 ? "pf-card--wide" : ""}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="pf-card-img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`pf-card-img ${hoveredProject === project.id ? "pf-card-img--zoom" : ""}`}
                  />
                  <div className="pf-card-overlay" />
                </div>
                <div className="pf-card-body">
                  <div className="pf-card-meta">
                    <span className="pf-card-cat">{project.category}</span>
                    <span className="pf-card-year">{project.year}</span>
                  </div>
                  <h3 className="pf-card-title">{project.title}</h3>
                  <p className="pf-card-desc">{project.description}</p>
                  <div className="pf-card-tags">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pf-card-tag"
                        style={{ borderColor: project.accent, color: project.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="pf-card-cta">
                    Смотреть проект <Icon name="ArrowUpRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="pf-contacts">
        <div className="pf-container pf-contacts-inner">
          <div className="pf-eyebrow pf-eyebrow--light">Контакты</div>
          <h2 className="pf-contacts-title">
            Есть идея?<br />
            <em className="pf-contacts-em">Давайте создадим</em><br />
            что-то вместе.
          </h2>
          <p className="pf-contacts-desc">
            Открыт для сотрудничества, freelance-проектов и творческих коллабораций.
          </p>
          <div className="pf-contacts-links">
            <a href="mailto:hello@example.com" className="pf-contact-link">
              <Icon name="Mail" size={20} />
              hello@example.com
            </a>
            <a href="https://t.me/username" className="pf-contact-link" target="_blank" rel="noreferrer">
              <Icon name="Send" size={20} />
              Telegram
            </a>
            <a href="https://instagram.com/username" className="pf-contact-link" target="_blank" rel="noreferrer">
              <Icon name="Instagram" size={20} />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pf-footer">
        <span>© 2024 AI·CREATOR. Все права защищены.</span>
        <button className="pf-footer-top" onClick={() => scrollTo("home")}>
          <Icon name="ArrowUp" size={15} /> Наверх
        </button>
      </footer>
    </div>
  );
}
