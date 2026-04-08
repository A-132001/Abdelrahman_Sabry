"use client";

import { useActionState, useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  saveEducationAction,
  deleteEducationAction,
} from "@/app/_lib/actions/education";
import type { Education } from "@/app/_lib/types";

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function refresh() {
    fetch("/api/education")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoaded(true);
      });
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleEdit(item: Education) {
    setEditing(item);
    setShowForm(true);
  }

  function handleNew() {
    setEditing(null);
    setShowForm(true);
  }

  async function handleDelete(id: string, label: string) {
    if (!confirm(`Delete "${label}"?`)) return;
    await deleteEducationAction(id);
    setItems((prev) => prev.filter((e) => e.id !== id));
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
          <h1 className="text-2xl font-bold text-foreground">Education</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your academic background.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNew}
          className="btn-primary !h-10 !px-4"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <EducationForm
            education={editing}
            onDone={() => {
              setShowForm(false);
              refresh();
            }}
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No education entries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-card-foreground">
                  {item.degree}
                </h3>
                <p className="text-sm font-medium text-accent">{item.field}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.institution}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.startYear} &mdash; {item.endYear ?? "Present"}
                </p>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="ml-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.degree)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function EducationForm({
  education,
  onDone,
}: {
  education: Education | null;
  onDone: () => void;
}) {
  const [state, action, pending] = useActionState(saveEducationAction, {});

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

      {education && <input type="hidden" name="id" value={education.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="degree" className="mb-1.5 block text-sm font-medium text-foreground">
            Degree *
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            required
            defaultValue={education?.degree}
            placeholder="Bachelor's Degree"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="field" className="mb-1.5 block text-sm font-medium text-foreground">
            Field of Study *
          </label>
          <input
            type="text"
            id="field"
            name="field"
            required
            defaultValue={education?.field}
            placeholder="Computer Science"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="institution" className="mb-1.5 block text-sm font-medium text-foreground">
          Institution *
        </label>
        <input
          type="text"
          id="institution"
          name="institution"
          required
          defaultValue={education?.institution}
          placeholder="University of Technology"
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startYear" className="mb-1.5 block text-sm font-medium text-foreground">
            Start Year
          </label>
          <input
            type="number"
            id="startYear"
            name="startYear"
            defaultValue={education?.startYear || new Date().getFullYear()}
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="endYear" className="mb-1.5 block text-sm font-medium text-foreground">
            End Year (empty for current)
          </label>
          <input
            type="number"
            id="endYear"
            name="endYear"
            defaultValue={education?.endYear ?? ""}
            placeholder="2024"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
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
          defaultValue={education?.description}
          placeholder="Brief description of your studies..."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary !h-10 disabled:opacity-50"
        >
          {pending ? "Saving..." : education ? "Update" : "Add Education"}
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
