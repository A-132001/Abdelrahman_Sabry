import type { Metadata } from "next";
import { readData } from "@/app/_lib/store";
import { Hero } from "./_components/hero";
import { About } from "./_components/about";
import { Experience } from "./_components/experience";
import { EducationSection } from "./_components/education";
import { CoursesSection } from "./_components/courses";
import { Skills } from "./_components/skills";
import { Contact } from "./_components/contact";

export const metadata: Metadata = {
  title: "AbdEl-Rahman Sabry — Full-Stack Developer",
  description:
    "Portfolio of AbdEl-Rahman Sabry, a software engineer specializing in Django, React, Next.js, and PostgreSQL.",
};

export default async function HomePage() {
  const data = await readData();

  return (
    <>
      <Hero info={data.personalInfo} />
      <About
        info={data.personalInfo}
        experiences={data.experiences}
        education={data.education}
      />
      <Experience
        experiences={data.experiences}
        education={data.education}
      />
      <EducationSection education={data.education} />
      <CoursesSection courses={data.courses} />
      <Skills skills={data.skills} />
      <Contact info={data.personalInfo} />
    </>
  );
}
