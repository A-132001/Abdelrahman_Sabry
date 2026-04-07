"use client";

import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/_lib/actions/projects";

export function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteProjectAction(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
      aria-label={`Delete ${title}`}
    >
      <Trash2 size={14} />
    </button>
  );
}
