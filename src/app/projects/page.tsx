import type { Metadata } from "next";
import Link from "next/link";
import { ProjectGrid } from "@/components/project-grid";
import projects from "@/data/projects.json";
import { siteUrl } from "@/lib/site";

const description =
  "Explore all 18 projects by Kousik Maity: full stack MERN applications, Generative AI assistants, machine learning experiments, and React tools. View live demos and source code.";
export const metadata: Metadata = {
  title: "Projects",
  description,
  ...(siteUrl ? { alternates: { canonical: "/projects/" } } : {}),
  openGraph: {
    title: "Projects | Kousik Maity",
    description,
    ...(siteUrl ? { url: `${siteUrl}/projects/` } : {}),
    images: [{ url: "/images/social-card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Kousik Maity",
    description,
    images: ["/images/social-card.png"],
  },
};

export default function ProjectsPage() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Kousik Maity",
    description,
    ...(siteUrl ? { url: `${siteUrl}/projects/` } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.live,
          author: { "@type": "Person", name: "Kousik Maity" },
        },
      })),
    },
  };
  return (
    <main id="main" className="archive-page container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Projects</span>
      </nav>
      <div className="archive-intro">
        <p className="eyebrow">THE PROJECT ARCHIVE</p>
        <h1>
          A little curiosity.
          <br />
          <span>A lot of building.</span>
        </h1>
        <p>
          Full stack applications, intelligent assistants, and experiments along
          the way. All {projects.length} projects, in one place.
        </p>
      </div>
      <ProjectGrid />
      <div className="archive-contact">
        <p>Have an interesting problem to solve?</p>
        <Link className="button button-primary" href="/#contact">
          Let’s talk
        </Link>
      </div>
    </main>
  );
}
