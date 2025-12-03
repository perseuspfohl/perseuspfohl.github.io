export type Project = {
  name: string;
  short: string;
  long?: string;
  points?: string[];
  pointsTitle?: string;
  techStack?: string[];
  images: string[];
  links?: {
    label: string;
    url: string;
  }[];
  id: string;
};

export const mainProjects: Project[] = [
  {
    name: "Portfolio Website",
    short: "Personal portfolio showcasing my projects and skills",
    long: "A responsive portfolio website built with modern web technologies to display my engineering projects, skills, and experience in an engaging and accessible way.",
    points: [
      "Built with TypeScript, React, and modern CSS",
      "Fully responsive design for all devices",
      "Optimized performance and fast loading times",
      "Clean, professional engineering aesthetic",
      "Interactive project showcases with smooth animations"
    ],
    pointsTitle: "Features",
    techStack: ["TypeScript", "React", "CSS", "Vite"],
    images: ["portfolio.webp"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/perseuspfohl/portfolio",
      },
      {
        label: "Live Site",
        url: "https://perseus.dev",
      },
    ],
    id: "portfolio",
  },
  {
    name: "Subnetting Pizza",
    short: "Python educational game for learning subnetting",
    long: "An interactive Python game designed to teach computer networking concepts, specifically IP subnetting, through engaging pizza-themed challenges and visual learning.",
    points: [
      "Makes complex networking concepts accessible and fun",
      "Visual learning approach with pizza-themed examples",
      "Progressive difficulty levels for all skill levels",
      "Instant feedback and learning reinforcement",
      "Clean, beginner-friendly codebase"
    ],
    pointsTitle: "Learning Features",
    techStack: ["Python", "Game Development", "Education"],
    images: ["subnetting.webp"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/perseuspfohl/subnetting-pizza",
      }
    ],
    id: "subnetting-pizza",
  }
];

export const miniProjects: Project[] = [];