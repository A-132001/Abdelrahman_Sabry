import { notFound } from "next/navigation";
import { readData } from "@/app/_lib/store";
import { ProjectForm } from "../_components/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await readData();
  const project = data.projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update &ldquo;{project.title}&rdquo;.
        </p>
      </div>
      <ProjectForm project={project} />
    </>
  );
}
