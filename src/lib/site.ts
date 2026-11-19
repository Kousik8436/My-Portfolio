const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// Keep absolute SEO URLs unset until a real public deployment URL is configured.
// This avoids indexing a made-up hostname or a private preview URL.
export const siteUrl = configuredUrl
  ? new URL(configuredUrl).origin
  : undefined;
export const siteDescription =
  "Kousik Maity is a Full Stack Developer and GenAI Engineer building MERN applications, AI assistants, and intelligent web experiences. Explore his projects, skills, and education.";
