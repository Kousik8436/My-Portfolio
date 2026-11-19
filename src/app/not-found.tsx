import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>
        This page is
        <br />
        <span>still an idea.</span>
      </h1>
      <p>Let’s get you back to something I’ve already built.</p>
      <Link className="button button-primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
