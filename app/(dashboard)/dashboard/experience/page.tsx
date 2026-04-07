"use client";

import { useActionState, useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  saveExperienceAction,
  deleteExperienceAction,
} from "@/app/_lib/actions/experience";
import type { Experience } from "@/app/_lib/types";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => r.json())
      .then((data) => {
        setExperiences(data);
        setLoaded(true);
      });
  }, []);

  function handleEdit(exp: Experience) {
    setEditing(exp);
    setShowForm(true);
  }

  function handleNew() {
    setEditing(null);
    setShowForm(true);
  }

  async function handleDelete(id: string, company: string) {
    if (!confirm(`Delete experience at "${company}"?`)) return;
    await deleteExperienceAction(id);
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  }

  if (!loaded) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Experience</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your work experience.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNew}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <ExperienceForm
            experience={editing}
            onDone={() => {
              setShowForm(false);
              // Refresh data
              fetch("/api/experience")
                .then((r) => r.json())
                .then(setExperiences);
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-start justify-between rounded-xl border border-border bg-card p-4"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-card-foreground">{exp.role}</h3>
              <p className="text-sm font-medium text-accent">{exp.company}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {exp.startDate} &mdash; {exp.endDate || "Present"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {exp.description}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleEdit(exp)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(exp.id, exp.company)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ExperienceForm({
  experience,
  onDone,
}: {
  experience: Experience | null;
  onDone: () => void;
}) {
  const [state, action, pending] = useActionState(saveExperienceAction, {});

  useEffect(() => {
    if (state.success) onDone();
  }, [state.success, onDone]);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {state.error}
        </div>
      )}

      {experience && <input type="hidden" name="id" value={experience.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-foreground">
            Role *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            defaultValue={experience?.role}
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
            Company *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            defaultValue={experience?.company}
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="mb-1.5 block text-sm font-medium text-foreground">
            Start Date (YYYY-MM)
          </label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            defaultValue={experience?.startDate}
            placeholder="2023-01"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-1.5 block text-sm font-medium text-foreground">
            End Date (leave empty for current)
          </label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            defaultValue={experience?.endDate || ""}
            placeholder="2024-06"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={experience?.description}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="highlights" className="mb-1.5 block text-sm font-medium text-foreground">
          Highlights (one per line)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={3}
          defaultValue={experience?.highlights.join("\n")}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          placeholder="Built a feature that...&#10;Improved performance by..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-10 rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving..." : experience ? "Update" : "Add Experience"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="h-10 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
