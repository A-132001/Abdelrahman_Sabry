"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { saveSkillsAction } from "@/app/_lib/actions/skills";
import type { Skill, SkillCategory } from "@/app/_lib/types";

const categories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Other",
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState<SkillCategory>("Frontend");
  const [state, action, pending] = useActionState(saveSkillsAction, {});

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        setSkills(data);
        setLoaded(true);
      });
  }, []);

  function addSkill() {
    if (!newSkill.trim()) return;
    if (skills.some((s) => s.name === newSkill.trim())) return;
    setSkills((prev) => [...prev, { name: newSkill.trim(), category: newCategory }]);
    setNewSkill("");
  }

  function removeSkill(name: string) {
    setSkills((prev) => prev.filter((s) => s.name !== name));
  }

  if (!loaded) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  const grouped = categories
    .map((cat) => ({
      category: cat,
      items: skills.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Skills</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your technical skills.
        </p>
      </div>

      {state.success && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
          Skills saved successfully.
        </div>
      )}
      {state.error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {state.error}
        </div>
      )}

      {/* Add new skill */}
      <div className="mb-8 flex flex-wrap items-end gap-3">
        <div>
          <label
            htmlFor="newSkill"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Skill Name
          </label>
          <input
            type="text"
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="h-11 w-48 rounded-lg border border-border bg-card px-4 text-sm text-card-foreground focus:border-accent focus:outline-none"
            placeholder="React"
          />
        </div>
        <div>
          <label
            htmlFor="newCategory"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Category
          </label>
          <select
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
            className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-card-foreground focus:border-accent focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Skills list grouped */}
      <div className="mb-8 space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.name)}
                    className="text-muted-foreground transition-colors hover:text-red-500"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <form action={action}>
        <input type="hidden" name="skills" value={JSON.stringify(skills)} />
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Skills"}
        </button>
      </form>
    </>
  );
}
