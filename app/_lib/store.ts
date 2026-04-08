import fs from "fs/promises";
import path from "path";
import type {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Course,
} from "./types";
import {
  personalInfo as defaultPersonalInfo,
  experiences as defaultExperiences,
  education as defaultEducation,
  skills as defaultSkills,
  projects as defaultProjects,
  courses as defaultCourses,
} from "./data";

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  courses: Course[];
}

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const defaultData: PortfolioData = {
      personalInfo: defaultPersonalInfo,
      experiences: defaultExperiences,
      education: defaultEducation,
      skills: defaultSkills,
      projects: defaultProjects,
      courses: defaultCourses,
    };
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

export async function readData(): Promise<PortfolioData> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

export async function writeData(data: PortfolioData): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}
