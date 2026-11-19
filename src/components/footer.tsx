import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">
          KOUSIK<span>✳</span>
        </div>
        <div className="footer-main">
          <Link href="/" className="footer-brand">
            MADE WITH CURIOSITY<span>.</span>
          </Link>
          <p>“Success is when preparation meets opportunity.”</p>
          <a className="back-top" href="#top">
            Back to top
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Kousik Maity</p>
          <div className="footer-socials">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
