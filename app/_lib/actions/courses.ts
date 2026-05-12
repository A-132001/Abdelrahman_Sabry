"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "../auth";
import { prisma } from "../prisma";
import type { Course } from "../types";

export async function saveCourseAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const provider = formData.get("provider") as string;

  if (!title || !provider) {
    return { error: "Title and provider are required." };
  }

  const entry: Course = {
    id: id || crypto.randomUUID(),
    title,
    provider,
    url: (formData.get("url") as string) || undefined,
    completedDate:
      (formData.get("completedDate") as string) ||
      new Date().toISOString().slice(0, 7),
    certificateUrl: (formData.get("certificateUrl") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
  };

  if (id) {
    await prisma.course.update({
      where: { id },
      data: entry,
    });
  } else {
    await prisma.course.create({
      data: entry,
    });
  }
  revalidatePath("/");
  revalidatePath("/dashboard/courses");

  return { success: true };
}

export async function deleteCourseAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/courses");
}
