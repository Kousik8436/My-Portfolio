import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiGithub,
  FiLayers,
} from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { ContactForm } from "@/components/contact-form";
import { ProjectArt } from "@/components/project-art";
import { education, profile, skillGroups } from "@/data/profile";
import projects from "@/data/projects.json";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
};
const featuredProjects = [projects[0], projects[1], projects[2], projects[4]];
const skillIcons = [FiCode, FiDatabase, FiCpu, FiLayers];
const specialties = [
  "FULL STACK",
  "GENERATIVE AI",
  "CREATIVE CODE",
  "PROBLEM SOLVING",
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": siteUrl ? `${siteUrl}/#person` : "#person",
        name: profile.name,
        jobTitle: profile.role,
        description: profile.bio,
        ...(siteUrl
          ? { url: siteUrl, image: `${siteUrl}/images/kousik-maity.webp` }
          : {}),
        sameAs: profile.socials.map((s) => s.url),
        knowsAbout: [
          "Full Stack Development",
          "Generative AI",
          "MERN Stack",
          "Core Java",
          "Data Structures and Algorithms",
          "REST APIs",
        ],
        affiliation: {
          "@type": "EducationalOrganization",
          name: "Haldia Institute of Technology",
        },
      },
      {
        "@type": "WebSite",
        name: "Kousik Maity Portfolio",
        ...(siteUrl ? { url: siteUrl } : {}),
        inLanguage: "en",
        author: { "@id": siteUrl ? `${siteUrl}/#person` : "#person" },
      },
    ],
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-watermark" aria-hidden="true">
          <FiCode />
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-line" /> KOUSIK MAITY — DEVELOPER & BUILDER
          </p>
          <h1 id="hero-heading">
            <span className="hero-line">
              <span>CODE.</span>
            </span>
            <span className="hero-line">
              <span>CREATE.</span>
            </span>
            <span className="hero-line hero-line-accent">
              <span>
                REPEAT<span className="hero-period">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-subcopy">
            <p className="hero-role">
              Full Stack Developer <span aria-hidden="true">×</span> GenAI
              Engineer
            </p>
            <p className="hero-description">{profile.introduction}</p>
            <div className="hero-actions">
              <a
                href="#projects"
                className="button button-primary"
                data-magnetic
              >
                See the work <FiLayers aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="button button-outline"
                data-magnetic
              >
                Let’s talk{" "}
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </a>
            </div>
          </div>
          <div className="hero-socials">
            <span>ELSEWHERE ON THE INTERNET</span>
            <a
              href={profile.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kousik Maity on GitHub"
            >
              <FiGithub aria-hidden="true" />
            </a>
            <a
              href={profile.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kousik Maity on LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a
              href={profile.socials[2].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kousik Maity on LeetCode"
            >
              <SiLeetcode aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="portrait-backplate" aria-hidden="true" />
          <div className="portrait-frame">
            <div className="portrait-inner">
              <Image
                src="/images/kousik-maity.webp"
                alt="Kousik Maity, Full Stack Developer and GenAI Engineer"
                width={768}
                height={1152}
                priority
                sizes="(max-width: 650px) 85vw, 440px"
                className="hero-portrait"
              />
            </div>
            <div className="portrait-caption">
              <span>THE HUMAN BEHIND THE CODE</span>
              <strong>
                KOUSIK
                <br />
                MAITY<span>.</span>
              </strong>
            </div>
          </div>
          <span className="hero-spark" aria-hidden="true">
            ✳
          </span>
          <div className="code-note">
            <FiCode aria-hidden="true" />
            <span>
              LESS TALK.
              <br />
              <strong>MORE BUILDING.</strong>
            </span>
          </div>
          <span className="portrait-side-note" aria-hidden="true">
            FUELED BY CURIOSITY. BUILT WITH CODE.
          </span>
          <span className="portrait-sticker" aria-hidden="true">
            ALWAYS
            <br />
            CURIOUS.
          </span>
        </div>
        <div className="hero-bottom">
          <span className="scroll-cue">
            <span aria-hidden="true" /> SCROLL TO EXPLORE
          </span>
          <span>18 PROJECTS. ENDLESS CURIOSITY.</span>
          <span className="hero-location">MERN STACK / GENERATIVE AI</span>
        </div>
      </section>
      <div className="specialties-strip">
        <div className="specialties-track">
          {[0, 1].map((copy) => (
            <div
              className="specialties-inner"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {specialties.map((specialty) => (
                <span className="specialty" key={specialty}>
                  {specialty}
                  <span className="strip-star" aria-hidden="true">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section
        className="section about-section container"
        id="about"
        aria-labelledby="about-heading"
      >
        <div className="section-intro" data-reveal>
          <p className="eyebrow">A LITTLE CONTEXT</p>
          <h2 id="about-heading">
            CURIOUS MIND.
            <br />
            <span className="muted-heading">BUILDER’S DNA.</span>
          </h2>
          <span className="about-symbol" aria-hidden="true">
            {"</>"}
          </span>
        </div>
        <div className="about-content" data-reveal>
          <p className="about-lead">
            Complex problems.
            <br />
            <em>Practical solutions.</em>
          </p>
          <p>{profile.bio}</p>
          <div className="about-facts">
            <div>
              <strong>
                1+ <span>YEARS</span>
              </strong>
              <span>Development experience</span>
            </div>
            <div>
              <strong>
                FULL STACK
                <br />& GENAI
              </strong>
              <span>My speciality</span>
            </div>
            <div>
              <strong>
                PERFORMANCE
                <br />& BACKEND
              </strong>
              <span>My focus</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section work-section"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <div className="container">
          <div className="work-stage">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">IDEAS OUT OF MY HEAD. INTO THE WORLD.</p>
                <h2 id="projects-heading">
                  SELECTED <span className="outline-text">WORK.</span>
                </h2>
              </div>
              <p>
                Full stack platforms. Intelligent assistants.
                <br />
                Real things, built from scratch.
              </p>
            </div>
            <div className="featured-grid">
              {featuredProjects.map((project) => (
                <article className="featured-card" key={project.id}>
                  <Link
                    href="/projects"
                    className="project-visual-link"
                    data-spotlight
                    data-tilt
                    aria-label={`Explore ${project.title} in the project archive`}
                  >
                    <ProjectArt
                      id={project.id}
                      title={project.title}
                      category={project.category}
                    />
                  </Link>
                  <div className="featured-card-content">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <span className="project-category">
                        {project.category}
                      </span>
                    </div>
                    <p>{project.description}</p>
                    <ul className="tag-list">
                      {project.tech
                        .split("•")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .slice(0, 4)
                        .map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                    <div className="project-actions">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink aria-hidden="true" />
                        {project.id === 5 ? "View demo" : "Live project"}
                        <span className="sr-only">: {project.title}</span>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiGithub aria-hidden="true" />
                        Source code
                        <span className="sr-only">: {project.title}</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="all-projects-row" data-reveal>
            <p>This is just the highlight reel.</p>
            <Link
              href="/projects"
              className="button button-primary"
              data-magnetic
            >
              All {projects.length} projects <FiLayers aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="section skills-section container"
        id="skills"
        aria-labelledby="skills-heading"
      >
        <div className="section-heading-row" data-reveal>
          <div>
            <p className="eyebrow">MY EVERYDAY ARSENAL</p>
            <h2 id="skills-heading">
              THE STACK.
              <br />
              <span className="muted-heading">ALWAYS EVOLVING.</span>
            </h2>
          </div>
          <p>
            The tools I turn to.
            <br />
            And the things I’m still geeking out over.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <article
                className="skill-group"
                key={group.title}
                data-reveal
                data-spotlight
              >
                <div className="skill-group-heading">
                  <span className="skill-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.subtitle}</p>
                  </div>
                </div>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="ai-note" data-reveal>
          <FiCpu aria-hidden="true" />
          <p>
            My current rabbit hole?{" "}
            <strong>Software engineering × Generative AI.</strong> LLM
            integration, prompt engineering, and intelligent automation.
          </p>
        </div>
      </section>
      <section
        className="section education-section"
        id="education"
        aria-labelledby="education-heading"
      >
        <div className="container education-layout">
          <div className="education-intro" data-reveal>
            <p className="eyebrow">STILL A STUDENT. ALWAYS A STUDENT.</p>
            <h2 id="education-heading">
              LEARN.
              <br />
              UNLEARN.
              <br />
              <span className="muted-heading">LEVEL UP.</span>
            </h2>
            <p>My educational journey and the foundations behind the work.</p>
            <span className="education-decoration" aria-hidden="true">
              {"{ }"}
            </span>
          </div>
          <div className="education-timeline">
            {education.map((item) => (
              <article className="education-item" key={item.degree} data-reveal>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="education-meta">
                  <span>{item.duration}</span>
                  <span className="education-score">{item.score}</span>
                </div>
                <h3>{item.degree}</h3>
                <p className="school">{item.school}</p>
                {item.description ? (
                  <p className="education-description">{item.description}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <div className="container contact-layout">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">GOT AN IDEA THAT WON’T LEAVE YOU ALONE?</p>
            <h2 id="contact-heading">
              LET’S
              <br />
              <span>
                MAKE
                <br />
                IT REAL.
              </span>
            </h2>
            <p>
              A project, an opportunity, or just a good conversation about
              building something cool. My inbox is open.
            </p>
            <a
              className="contact-linkedin"
              href={profile.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn aria-hidden="true" />
              <span>
                Find me on LinkedIn
                <span className="contact-link-sub">
                  Let’s connect the dots.
                </span>
              </span>
            </a>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
