"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "../auth";
import { prisma } from "../prisma";
import type { Project } from "../types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseProjectForm(formData: FormData, existingId?: string): Project {
  const title = formData.get("title") as string;
  return {
    id: existingId || crypto.randomUUID(),
    title,
    slug: slugify(title),
    description: formData.get("description") as string,
    longDescription: formData.get("longDescription") as string,
    imageUrl: (formData.get("imageUrl") as string) || "/projects/default.jpg",
    tags: (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    liveUrl: (formData.get("liveUrl") as string) || undefined,
    githubUrl: (formData.get("githubUrl") as string) || undefined,
    featured: formData.get("featured") === "on",
    createdAt:
      (formData.get("createdAt") as string) ||
      new Date().toISOString().split("T")[0],
  };
}

export async function createProjectAction(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  if (!title) return { error: "Title is required." };

  const project = parseProjectForm(formData);
  await prisma.project.create({ data: project });

  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/dashboard/projects");
}

export async function updateProjectAction(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const isAuth = await verifySession();
  if (!isAuth) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  if (!title) return { error: "Title is required." };

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };

  const updated = parseProjectForm(formData, id);
  await prisma.project.update({
    where: { id },
    data: updated,
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${existing.slug}`);
  revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/");
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
}
