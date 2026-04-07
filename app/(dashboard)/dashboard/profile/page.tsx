"use client";

import { useActionState, useEffect, useState } from "react";
import { updateProfileAction } from "@/app/_lib/actions/profile";

export default function ProfilePage() {
  const [state, action, pending] = useActionState(updateProfileAction, {});
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    tagline: "",
    bio: "",
    email: "",
    location: "",
    resumeUrl: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        const gh =
          data.socialLinks?.find(
            (l: { platform: string }) => l.platform === "GitHub"
          )?.url || "";
        const li =
          data.socialLinks?.find(
            (l: { platform: string }) => l.platform === "LinkedIn"
          )?.url || "";
        const tw =
          data.socialLinks?.find(
            (l: { platform: string }) => l.platform === "Twitter"
          )?.url || "";
        setForm({
          name: data.name || "",
          title: data.title || "",
          tagline: data.tagline || "",
          bio: data.bio || "",
          email: data.email || "",
          location: data.location || "",
          resumeUrl: data.resumeUrl || "",
          github: gh,
          linkedin: li,
          twitter: tw,
        });
        setLoaded(true);
      });
  }, []);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </div>

      <form action={action} className="max-w-2xl space-y-6">
        {state.success && (
          <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
            Profile updated successfully.
          </div>
        )}
        {state.error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            {state.error}
          </div>
        )}

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Basic Info
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />
            <FormField
              label="Job Title"
              name="title"
              value={form.title}
              onChange={(v) => update("title", v)}
            />
          </div>
          <FormField
            label="Tagline"
            name="tagline"
            value={form.tagline}
            onChange={(v) => update("tagline", v)}
          />
          <FormTextarea
            label="Bio"
            name="bio"
            value={form.bio}
            rows={4}
            onChange={(v) => update("bio", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
            />
            <FormField
              label="Location"
              name="location"
              value={form.location}
              onChange={(v) => update("location", v)}
            />
          </div>
          <FormField
            label="Resume URL"
            name="resumeUrl"
            value={form.resumeUrl}
            onChange={(v) => update("resumeUrl", v)}
            placeholder="/resume.pdf"
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Social Links
          </legend>
          <FormField
            label="GitHub URL"
            name="github"
            value={form.github}
            onChange={(v) => update("github", v)}
            placeholder="https://github.com/username"
          />
          <FormField
            label="LinkedIn URL"
            name="linkedin"
            value={form.linkedin}
            onChange={(v) => update("linkedin", v)}
            placeholder="https://linkedin.com/in/username"
          />
          <FormField
            label="Twitter URL"
            name="twitter"
            value={form.twitter}
            onChange={(v) => update("twitter", v)}
            placeholder="https://twitter.com/username"
          />
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </>
  );
}

function FormField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
      />
    </div>
  );
}

function FormTextarea({
  label,
  name,
  value,
  rows = 3,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  rows?: number;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
      />
    </div>
  );
}
