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
import { prisma } from "./prisma";

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  courses: Course[];
}

let isBootstrapped = false;

async function bootstrapDefaults() {
  if (isBootstrapped) return;

  const profileCount = await prisma.personalInfo.count();
  if (profileCount > 0) {
    isBootstrapped = true;
    return;
  }

  await prisma.personalInfo.create({
    data: {
      ...defaultPersonalInfo,
      links: {
        create: defaultPersonalInfo.socialLinks,
      },
    },
  });

  if (defaultExperiences.length) {
    await prisma.experience.createMany({ data: defaultExperiences });
  }

  if (defaultEducation.length) {
    await prisma.education.createMany({ data: defaultEducation });
  }

  if (defaultCourses.length) {
    await prisma.course.createMany({ data: defaultCourses });
  }

  if (defaultSkills.length) {
    await prisma.skill.createMany({ data: defaultSkills });
  }

  if (defaultProjects.length) {
    await prisma.project.createMany({ data: defaultProjects });
  }

  isBootstrapped = true;
}

export async function readData(): Promise<PortfolioData> {
  try {
    await bootstrapDefaults();

    const [personalInfo, experiences, education, skills, projects, courses] =
      await Promise.all([
        prisma.personalInfo.findFirst({
          include: {
            links: true,
          },
        }),
        prisma.experience.findMany(),
        prisma.education.findMany(),
        prisma.skill.findMany(),
        prisma.project.findMany(),
        prisma.course.findMany(),
      ]);

    if (!personalInfo) {
      return {
        personalInfo: defaultPersonalInfo,
        experiences: defaultExperiences,
        education: defaultEducation,
        skills: defaultSkills,
        projects: defaultProjects,
        courses: defaultCourses,
      };
    }

    return {
      personalInfo: {
        name: personalInfo.name,
        title: personalInfo.title,
        tagline: personalInfo.tagline,
        bio: personalInfo.bio,
        avatarUrl: personalInfo.avatarUrl,
        resumeUrl: personalInfo.resumeUrl,
        email: personalInfo.email,
        location: personalInfo.location,
        socialLinks: personalInfo.links.map((link) => ({
          platform: link.platform,
          url: link.url,
          icon: link.icon,
        })),
      },
      experiences: experiences.map((item) => ({
        ...item,
        endDate: item.endDate ?? null,
      })),
      education: education.map((item) => ({
        ...item,
        description: item.description ?? undefined,
      })),
      skills: skills.map((skill) => ({
        name: skill.name,
        category: skill.category as Skill["category"],
      })),
      projects: projects.map((item) => ({
        ...item,
        liveUrl: item.liveUrl ?? undefined,
        githubUrl: item.githubUrl ?? undefined,
      })),
      courses: courses.map((item) => ({
        ...item,
        url: item.url ?? undefined,
        certificateUrl: item.certificateUrl ?? undefined,
        description: item.description ?? undefined,
      })),
    };
  } catch {
    return {
      personalInfo: defaultPersonalInfo,
      experiences: defaultExperiences,
      education: defaultEducation,
      skills: defaultSkills,
      projects: defaultProjects,
      courses: defaultCourses,
    };
  }
}

export async function writeData(data: PortfolioData): Promise<void> {
  const profile = await prisma.personalInfo.findFirst();
  if (!profile) return;

  await prisma.personalInfo.update({
    where: { id: profile.id },
    data: {
      name: data.personalInfo.name,
      title: data.personalInfo.title,
      tagline: data.personalInfo.tagline,
      bio: data.personalInfo.bio,
      avatarUrl: data.personalInfo.avatarUrl,
      resumeUrl: data.personalInfo.resumeUrl,
      email: data.personalInfo.email,
      location: data.personalInfo.location,
    },
  });
}
