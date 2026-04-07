"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { readData, writeData } from "../store";
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

  const data = await readData();

  if (id) {
    const index = data.experiences.findIndex((e) => e.id === id);
    if (index !== -1) data.experiences[index] = entry;
  } else {
    data.experiences.unshift(entry);
  }

  await writeData(data);
  revalidatePath("/");
  revalidatePath("/dashboard/experience");

  return { success: true };
}

export async function deleteExperienceAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  const data = await readData();
  data.experiences = data.experiences.filter((e) => e.id !== id);
  await writeData(data);

  revalidatePath("/");
  revalidatePath("/dashboard/experience");
}
