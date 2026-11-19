"use client";

import { useState } from "react";
import { FiGithub, FiExternalLink, FiSearch } from "react-icons/fi";
import projects from "@/data/projects.json";
import { ProjectArt } from "./project-art";

const filters = ["All projects", "Full Stack", "GenAI", "React"];
const normalizeSearch = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function ProjectGrid() {
  const [filter, setFilter] = useState("All projects");
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearch(query.trim());
  const filtered = projects.filter(
    (p) =>
      (filter === "All projects" || p.category === filter) &&
      normalizeSearch(`${p.title} ${p.description} ${p.tech}`).includes(
        normalizedQuery,
      ),
  );

  return (
    <>
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((item) => (
            <button
              type="button"
              aria-pressed={filter === item}
              key={item}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>
                {item === "All projects"
                  ? projects.length
                  : projects.filter((p) => p.category === item).length}
              </span>
            </button>
          ))}
        </div>
        <label className="project-search">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Search projects…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className="results-count" role="status">
        Showing {filtered.length} of {projects.length} projects
      </p>
      <div className="archive-grid">
        {filtered.map((project) => (
          <article className="archive-card" key={project.id} data-spotlight>
            <ProjectArt
              id={project.id}
              title={project.title}
              category={project.category}
            />
            <div className="archive-card-body">
              <span className="eyebrow small-eyebrow">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <ul className="tag-list">
                {project.tech
                  .split("•")
                  .map((s) => s.trim())
                  .filter(Boolean)
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
                  Source code<span className="sr-only">: {project.title}</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <FiSearch aria-hidden="true" />
          <h2>No projects found</h2>
          <p>Try a different keyword or explore all projects.</p>
          <button
            className="button button-primary"
            onClick={() => {
              setQuery("");
              setFilter("All projects");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </>
  );
}
