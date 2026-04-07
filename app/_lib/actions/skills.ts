"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { readData, writeData } from "../store";
import type { Skill, SkillCategory } from "../types";

const validCategories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Other",
];

export async function saveSkillsAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const raw = formData.get("skills") as string;
  if (!raw) return { error: "No skills provided." };

  try {
    const parsed: Skill[] = JSON.parse(raw);
    const validated = parsed.filter(
      (s) =>
        s.name &&
        validCategories.includes(s.category)
    );

    const data = await readData();
    data.skills = validated;
    await writeData(data);

    revalidatePath("/");
    revalidatePath("/dashboard/skills");

    return { success: true };
  } catch {
    return { error: "Invalid skills data." };
  }
}
