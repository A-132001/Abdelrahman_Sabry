import type { Metadata } from "next";
import { readData } from "@/app/_lib/store";
import { Hero } from "./_components/hero";
import { About } from "./_components/about";
import { Experience } from "./_components/experience";
import { Skills } from "./_components/skills";
import { Contact } from "./_components/contact";

export const metadata: Metadata = {
  title: "Abdelrhman Tawfek — Full-Stack Developer",
  description:
    "Portfolio of Abdelrhman Tawfek, a full-stack developer specializing in React, Next.js, and Node.js.",
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
      <Skills skills={data.skills} />
      <Contact info={data.personalInfo} />
    </>
  );
}
