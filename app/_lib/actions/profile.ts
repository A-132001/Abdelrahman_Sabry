"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { prisma } from "../prisma";

export async function updateProfileAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const profile = await prisma.personalInfo.findFirst();
  if (!profile) return { error: "Profile not found." };

  const links = [
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
  ].filter((link) => link.url);

  await prisma.personalInfo.update({
    where: { id: profile.id },
    data: {
      name: (formData.get("name") as string) || profile.name,
      title: (formData.get("title") as string) || profile.title,
      tagline: (formData.get("tagline") as string) || profile.tagline,
      bio: (formData.get("bio") as string) || profile.bio,
      email: (formData.get("email") as string) || profile.email,
      location: (formData.get("location") as string) || profile.location,
      resumeUrl: (formData.get("resumeUrl") as string) || profile.resumeUrl,
      links: {
        deleteMany: {},
        create: links,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/profile");

  return { success: true };
}
