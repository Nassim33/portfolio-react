import type { JSX } from "react";
import { Icon } from "@iconify/react";
import { heroLight, heroDark, logo } from "./ui/assets";

export { heroLight as Light };
export { heroDark as Dark };

export const githubUsername: string = "Nassim33";

export const linkedinUrl: string = "https://www.linkedin.com/in/sami-saigaud";

export const heroTagline: string =
  "Senior Frontend Developer | React · TypeScript · JavaScript | Architecture Frontend · Applications Web · UI/UX";

export const moreInfo: string =
  "I create dynamic websites and web applications, using the latest technology and best web practices.";

export interface Skill {
  id: number;
  skill: JSX.Element;
  name: string;
}

const skillIconStyle = { fontSize: "3.5rem" };

export const skillData: Skill[] = [
  {
    id: 1,
    skill: <Icon icon="mdi:language-html5" style={skillIconStyle} />,
    name: "HTML5",
  },
  {
    id: 2,
    skill: <Icon icon="ion:logo-css3" style={skillIconStyle} />,
    name: "CSS3",
  },
  {
    id: 3,
    skill: <Icon icon="fa6-brands:js" style={skillIconStyle} />,
    name: "JavaScript",
  },
  {
    id: 4,
    skill: <Icon icon="mdi:language-typescript" style={skillIconStyle} />,
    name: "TypeScript",
  },
  {
    id: 5,
    skill: <Icon icon="mdi:react" style={skillIconStyle} />,
    name: "React",
  },
  {
    id: 6,
    skill: <Icon icon="simple-icons:antdesign" style={skillIconStyle} />,
    name: "Ant design",
  },
  {
    id: 7,
    skill: <Icon icon="simple-icons:mui" style={skillIconStyle} />,
    name: "Material UI",
  },
  {
    id: 8,
    skill: <Icon icon="simple-icons:googlesheets" style={skillIconStyle} />,
    name: "Google sheet addin",
  },
  {
    id: 9,
    skill: <Icon icon="ant-design:file-excel-filled" style={skillIconStyle} />,
    name: "Excel online addin",
  },
  {
    id: 10,
    skill: <Icon icon="simple-icons:figma" style={skillIconStyle} />,
    name: "Figma",
  },
  {
    id: 11,
    skill: <Icon icon="bi:git" style={skillIconStyle} />,
    name: "Git",
  },
  {
    id: 12,
    skill: <Icon icon="fa6-brands:square-github" style={skillIconStyle} />,
    name: "GitHub",
  },
];

export const resume: string | null = null;

export const filteredProjects: string[] = ["example-1", "example-2", "example-3"];

export interface ProjectCardImage {
  name: string;
  image: string;
}

export const projectCardImages: ProjectCardImage[] = [
  {
    name: "example-1",
    image: logo,
  },
];

export const formspreeUrl: string = "https://formspree.io/f/xbjnjvjb";