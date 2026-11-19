import sharp from "sharp";

await sharp("public/images/kousik-maity.jpg")
  .resize(768)
  .webp({ quality: 85 })
  .toFile("public/images/kousik-maity.webp");
await sharp("public/icon.svg")
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#0a0a0a"/><path d="M0 0h1200v7H0z" fill="#d5fc50"/><text x="65" y="69" fill="#d5fc50" font-family="Arial,sans-serif" font-size="20" letter-spacing="3">KOUSIK MAITY / DEVELOPER &amp; BUILDER</text><text x="60" y="215" fill="#f1f0e9" font-family="Arial,sans-serif" font-weight="900" font-size="122" letter-spacing="-9">CODE.</text><text x="60" y="335" fill="#f1f0e9" font-family="Arial,sans-serif" font-weight="900" font-size="122" letter-spacing="-9">CREATE.</text><text x="60" y="455" fill="#d5fc50" font-family="Arial,sans-serif" font-weight="900" font-size="122" letter-spacing="-9">REPEAT.</text><line x1="65" y1="510" x2="1135" y2="510" stroke="#38382e"/><text x="65" y="563" fill="#b5b5aa" font-family="Arial,sans-serif" font-size="24">Full Stack Developer × GenAI Engineer</text><rect x="846" y="143" width="250" height="297" rx="24" fill="#171715" stroke="#d5fc50" transform="rotate(6 971 291)"/><text x="885" y="325" fill="#d5fc50" font-family="Arial,sans-serif" font-size="108" font-weight="bold">&lt;/&gt;</text><g stroke="#b8a3ff" stroke-width="6"><path d="M1060 70v95m-47-47h95m-81-34 68 68m-68 0 68-68"/></g><text x="900" y="397" fill="#b8a3ff" font-family="Arial,sans-serif" font-size="14" letter-spacing="1">ALWAYS CURIOUS.</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/images/social-card.png");
console.log(
  "Prepared optimized portrait, neon social sharing card, and touch icon.",
);
