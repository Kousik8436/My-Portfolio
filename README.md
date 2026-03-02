# 🚀 Kousik Maity - Portfolio

A modern, interactive portfolio website showcasing my journey as a Full Stack Developer and GenAI Engineer. Built with React, featuring stunning animations, particle effects, and a seamless user experience.

![Portfolio Preview](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with gradient effects and smooth animations
- ⚡ **Interactive Particles** - Dynamic particle background effects using Canvas API
- 🎭 **Framer Motion Animations** - Smooth page transitions and scroll-based animations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🎵 **Music Player** - Background music player with custom controls
- 🖱️ **Custom Cursor** - Unique cursor design for enhanced user experience
- 📧 **Contact Form** - Integrated EmailJS for direct communication
- 🎯 **Project Showcase** - Interactive 3D card stack for project display
- 🎓 **Education Timeline** - Animated scroll-based education journey
- 💼 **Skills Display** - Categorized tech stack with hover effects

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Libraries & Tools
- **EmailJS** - Email service integration
- **React Icons** - Icon library
- **Canvas API** - Particle effects

## 📂 Project Structure

```
my-portfolio/
├── public/              # Static assets (music, images)
├── src/
│   ├── assets/         # Images and logos
│   ├── components/     # Reusable components
│   │   ├── CustomCursor.jsx
│   │   ├── IntroAnimation.jsx
│   │   ├── Logo.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── Navbar.jsx
│   │   ├── OverlayMenu.jsx
│   │   ├── ParticlesBackground.jsx
│   │   └── constants.js
│   ├── section/        # Page sections
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Kousik8436/My-Portfolio.git
cd My-Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## 🎨 Customization

### Colors
The project uses a custom gradient color scheme. Main colors:
- Primary: `#1cd8d2` (Cyan)
- Secondary: `#00bf8f` (Green)
- Accent: `#302b63` (Purple)

Update these in `tailwind.config.js` or component files.

### Content
- **Personal Info**: Update in `src/section/About.jsx`
- **Projects**: Modify `projectsData` array in `src/section/Projects.jsx`
- **Skills**: Edit `SkillsInfo` in `src/components/constants.js`
- **Education**: Update `experiences` array in `src/section/Experience.jsx`

## 📧 Contact Form Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Add your credentials to `.env` file

## 🌟 Key Sections

- **Home** - Hero section with animated text and social links
- **About** - Personal introduction and statistics
- **Education** - Interactive timeline of educational journey
- **Skills** - Categorized technical skills with logos
- **Projects** - 3D card stack showcasing 17+ projects
- **Contact** - Form with email validation and EmailJS integration
- **Footer** - Social links and branding

## 🔒 Security Note

⚠️ **Important**: The project has some dependency vulnerabilities. Run the following to fix:

```bash
npm audit fix
```

Update these packages manually if needed:
- rollup (to v4.59.0+)
- minimatch (to v10.2.3+)
- ajv (to v8.18.0+)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Kousik Maity**
- GitHub: [@Kousik8436](https://github.com/Kousik8436)
- LinkedIn: [Kousik Maity](https://www.linkedin.com/in/kousik-maity-b82a10285)
- Instagram: [@kousik_kartik_8436](https://www.instagram.com/kousik_kartik_8436)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

⭐ **If you like this project, please give it a star!** ⭐

Made with ❤️ by Kousik Maity
