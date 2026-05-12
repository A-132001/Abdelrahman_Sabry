"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { prisma } from "../prisma";
import type { Experience } from "../types";

export async function saveExperienceAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;

  if (!company || !role) return { error: "Company and role are required." };

  const entry: Experience = {
    id: id || crypto.randomUUID(),
    company,
    role,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || null,
    description: formData.get("description") as string,
    highlights: (formData.get("highlights") as string)
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean),
  };

  if (id) {
    await prisma.experience.update({
      where: { id },
      data: entry,
    });
  } else {
    await prisma.experience.create({
      data: entry,
    });
  }
  revalidatePath("/");
  revalidatePath("/dashboard/experience");

  return { success: true };
}

export async function deleteExperienceAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/experience");
}
