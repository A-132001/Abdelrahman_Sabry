"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { readData, writeData } from "../store";
import type { PersonalInfo } from "../types";

export async function updateProfileAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const data = await readData();

  const updated: PersonalInfo = {
    ...data.personalInfo,
    name: (formData.get("name") as string) || data.personalInfo.name,
    title: (formData.get("title") as string) || data.personalInfo.title,
    tagline: (formData.get("tagline") as string) || data.personalInfo.tagline,
    bio: (formData.get("bio") as string) || data.personalInfo.bio,
    email: (formData.get("email") as string) || data.personalInfo.email,
    location:
      (formData.get("location") as string) || data.personalInfo.location,
    resumeUrl:
      (formData.get("resumeUrl") as string) || data.personalInfo.resumeUrl,
    socialLinks: [
      {
        platform: "GitHub",
        url: (formData.get("github") as string) || "",
        icon: "github",
      },
      {
        platform: "LinkedIn",
        url: (formData.get("linkedin") as string) || "",
        icon: "linkedin",
      },
      {
        platform: "Twitter",
        url: (formData.get("twitter") as string) || "",
        icon: "twitter",
      },
    ].filter((l) => l.url),
  };

  data.personalInfo = updated;
  await writeData(data);

  revalidatePath("/");
  revalidatePath("/dashboard/profile");

  return { success: true };
}
