"use client";

import { useActionState, useEffect, useState } from "react";
import { Trash2, Plus, ArrowUpRight } from "lucide-react";
import {
  saveCourseAction,
  deleteCourseAction,
} from "@/app/_lib/actions/courses";
import type { Course } from "@/app/_lib/types";

export default function CoursesPage() {
  const [items, setItems] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function refresh() {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoaded(true);
      });
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleEdit(item: Course) {
    setEditing(item);
    setShowForm(true);
  }

  function handleNew() {
    setEditing(null);
    setShowForm(true);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteCourseAction(id);
    setItems((prev) => prev.filter((c) => c.id !== id));
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
          <h1 className="text-2xl font-bold text-foreground">
            Courses & Certifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your courses and certifications.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNew}
          className="btn-primary !h-10 !px-4"
        >
          <Plus size={16} />
          Add Course
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <CourseForm
            course={editing}
            onDone={() => {
              setShowForm(false);
              refresh();
            }}
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No courses yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge-accent flex items-center gap-1"
                    >
                      Certified
                      <ArrowUpRight size={10} />
                    </a>
                  )}
                </div>
                <p className="text-sm font-medium text-accent">
                  {item.provider}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Completed: {item.completedDate}
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
                  onClick={() => handleDelete(item.id, item.title)}
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

function CourseForm({
  course,
  onDone,
}: {
  course: Course | null;
  onDone: () => void;
}) {
  const [state, action, pending] = useActionState(saveCourseAction, {});

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

      {course && <input type="hidden" name="id" value={course.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
            Course Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={course?.title}
            placeholder="The Complete Web Developer Bootcamp"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="provider" className="mb-1.5 block text-sm font-medium text-foreground">
            Provider *
          </label>
          <input
            type="text"
            id="provider"
            name="provider"
            required
            defaultValue={course?.provider}
            placeholder="Udemy, Coursera, etc."
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="completedDate" className="mb-1.5 block text-sm font-medium text-foreground">
            Completed Date (YYYY-MM)
          </label>
          <input
            type="text"
            id="completedDate"
            name="completedDate"
            defaultValue={course?.completedDate}
            placeholder="2024-01"
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="url" className="mb-1.5 block text-sm font-medium text-foreground">
            Course URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            defaultValue={course?.url}
            placeholder="https://udemy.com/course/..."
            className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="certificateUrl" className="mb-1.5 block text-sm font-medium text-foreground">
          Certificate URL
        </label>
        <input
          type="url"
          id="certificateUrl"
          name="certificateUrl"
          defaultValue={course?.certificateUrl}
          placeholder="https://credential.net/..."
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={course?.description}
          placeholder="What did you learn in this course?"
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary !h-10 disabled:opacity-50"
        >
          {pending ? "Saving..." : course ? "Update" : "Add Course"}
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
