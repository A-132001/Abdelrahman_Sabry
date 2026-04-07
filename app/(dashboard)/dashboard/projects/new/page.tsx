import { ProjectForm } from "../_components/project-form";

export default function NewProjectPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Add Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new project for your portfolio.
        </p>
      </div>
      <ProjectForm />
    </>
  );
}
