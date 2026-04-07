"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "../auth";
import { readData, writeData } from "../store";
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

  const data = await readData();
  const project = parseProjectForm(formData);
  data.projects.push(project);
  await writeData(data);

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

  const data = await readData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return { error: "Project not found." };

  data.projects[index] = parseProjectForm(formData, id);
  await writeData(data);

  revalidatePath("/projects");
  revalidatePath(`/projects/${data.projects[index].slug}`);
  revalidatePath("/");
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(id: string): Promise<void> {
  const isAuth = await verifySession();
  if (!isAuth) return;

  const data = await readData();
  data.projects = data.projects.filter((p) => p.id !== id);
  await writeData(data);

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
}
