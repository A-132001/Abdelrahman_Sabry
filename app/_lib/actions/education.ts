"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { prisma } from "../prisma";
import type { Education } from "../types";

export async function saveEducationAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const institution = formData.get("institution") as string;
  const degree = formData.get("degree") as string;
  const field = formData.get("field") as string;

  if (!institution || !degree || !field) {
    return { error: "Institution, degree, and field are required." };
  }

  const entry: Education = {
    id: id || crypto.randomUUID(),
    institution,
    degree,
    field,
    startYear: Number(formData.get("startYear")) || new Date().getFullYear(),
    endYear: (formData.get("endYear") as string)
      ? Number(formData.get("endYear"))
      : null,
    description: (formData.get("description") as string) || undefined,
  };

  if (id) {
    await prisma.education.update({
      where: { id },
      data: entry,
    });
  } else {
    await prisma.education.create({
      data: entry,
    });
  }
  revalidatePath("/");
  revalidatePath("/dashboard/education");

  return { success: true };
}

export async function deleteEducationAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  await prisma.education.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/education");
}
