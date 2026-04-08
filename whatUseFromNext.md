# What We Use From Next.js in This Project

A guide to every Next.js feature used in this portfolio, with file locations so you can study each one.

---

## 1. App Router (File-Based Routing)

Next.js uses the `app/` directory where **folder structure = URL structure**. Every folder with a `page.tsx` becomes a route.

| File | URL |
|------|-----|
| `app/(public)/page.tsx` | `/` |
| `app/(public)/projects/page.tsx` | `/projects` |
| `app/(public)/projects/[slug]/page.tsx` | `/projects/erp-payroll-management-system` |
| `app/(auth)/login/page.tsx` | `/login` |
| `app/(dashboard)/dashboard/page.tsx` | `/dashboard` |
| `app/(dashboard)/dashboard/projects/new/page.tsx` | `/dashboard/projects/new` |

**Where to study:** Look at the `app/` folder structure and compare it to the URLs in the browser.

---

## 2. Route Groups `(folderName)`

Folders wrapped in parentheses like `(public)`, `(auth)`, `(dashboard)` are **route groups**. They organize code without affecting the URL.

```
app/
  (public)/       -> URL: /           (no /public in the URL)
  (auth)/login/   -> URL: /login      (no /auth in the URL)
  (dashboard)/    -> URL: /dashboard
```

**Why?** Each group can have its own `layout.tsx`. The public pages get a Header + Footer, but the dashboard gets a Sidebar instead.

**Files:**
- `app/(public)/layout.tsx` — wraps public pages with Header + Footer
- `app/(dashboard)/dashboard/layout.tsx` — wraps dashboard with Sidebar + auth check

---

## 3. Layouts (`layout.tsx`)

Layouts wrap child pages and **persist across navigation** (they don't re-render when you navigate between pages inside them).

```
app/layout.tsx                          -> Root layout (fonts, global CSS, <html>/<body>)
app/(public)/layout.tsx                 -> Public layout (Header + Footer)
app/(dashboard)/dashboard/layout.tsx    -> Dashboard layout (Sidebar + auth guard)
```

The root layout is **required** — it wraps the entire app. Nested layouts wrap only their segment.

**Key concept:** Layouts receive `{ children }` and render it. The `children` is the current page.

---

## 4. Server Components (Default)

In Next.js App Router, **every component is a Server Component by default**. This means:
- They run on the server, not in the browser
- They can directly access the filesystem, databases, secrets
- They send only HTML to the client (zero JavaScript)

**Examples in this project:**
- `app/(public)/page.tsx` — reads data from JSON file with `readData()` directly
- `app/(public)/_components/hero.tsx` — renders HTML on server, no `useState` needed
- `app/(public)/_components/experience.tsx` — receives data as props, renders on server
- `app/_components/footer.tsx` — reads data with `readData()` directly in the component
- `app/(dashboard)/dashboard/page.tsx` — reads data and renders stats on server

---

## 5. Client Components (`"use client"`)

When you need **interactivity** (state, effects, event handlers, browser APIs), you add `"use client"` at the top of the file.

**Files that use `"use client"`:**
- `app/_components/header.tsx` — `useState` for mobile menu, `useEffect` for scroll detection
- `app/_components/animate-on-scroll.tsx` — `useEffect` + `useRef` for IntersectionObserver
- `app/(auth)/login/page.tsx` — `useActionState` for form submission
- `app/(dashboard)/dashboard/_components/sidebar.tsx` — `useState` for mobile toggle, `usePathname` for active link
- `app/(dashboard)/dashboard/profile/page.tsx` — `useState` + `useEffect` for form state
- `app/(dashboard)/dashboard/skills/page.tsx` — interactive skill adding/removing
- `app/(dashboard)/dashboard/experience/page.tsx` — inline editing forms
- `app/(public)/projects/_components/project-filters.tsx` — `useState` for search and tag filtering

**Key rule:** Only add `"use client"` where you actually need interactivity. Keep everything else as Server Components.

---

## 6. Dynamic Routes (`[param]`)

Square brackets create dynamic URL segments:

```
app/(public)/projects/[slug]/page.tsx    -> /projects/any-slug-here
app/(dashboard)/dashboard/projects/[id]/page.tsx -> /dashboard/projects/any-id-here
```

**How to access the param (Next.js 16 — params is a Promise!):**

```tsx
// IMPORTANT: In Next.js 16, params must be awaited
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  // Must await!
  // use slug...
}
```

**Files:**
- `app/(public)/projects/[slug]/page.tsx` — uses `await params` to get project slug
- `app/(dashboard)/dashboard/projects/[id]/page.tsx` — uses `await params` to get project ID

---

## 7. Static Generation with `generateStaticParams`

For dynamic routes, `generateStaticParams` tells Next.js which pages to pre-build at build time (SSG).

```tsx
// app/(public)/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const data = await readData();
  return data.projects.map((p) => ({ slug: p.slug }));
}
```

At build time, Next.js generates:
```
/projects/erp-payroll-management-system    (static HTML)
/projects/multi-vendor-ecommerce           (static HTML)
/projects/donation-platform                (static HTML)
...
```

**Build output shows this:**
```
● /projects/[slug]     (SSG - prerendered as static HTML)
```

---

## 8. Server Actions (`"use server"`)

Server Actions are functions that run on the server but can be called from client components (like form submissions).

**Files:**
- `app/_lib/actions/auth.ts` — `loginAction`, `logoutAction`
- `app/_lib/actions/projects.ts` — `createProjectAction`, `updateProjectAction`, `deleteProjectAction`
- `app/_lib/actions/profile.ts` — `updateProfileAction`
- `app/_lib/actions/experience.ts` — `saveExperienceAction`, `deleteExperienceAction`
- `app/_lib/actions/education.ts` — `saveEducationAction`, `deleteEducationAction`
- `app/_lib/actions/courses.ts` — `saveCourseAction`, `deleteCourseAction`
- `app/_lib/actions/skills.ts` — `saveSkillsAction`

**How they work:**

```tsx
// 1. Define the action (server-side)
"use server";
export async function loginAction(_prev: LoginState, formData: FormData) {
  const email = formData.get("email") as string;
  // validate, create session, redirect...
}

// 2. Use it in a client component with useActionState
"use client";
const [state, action, pending] = useActionState(loginAction, {});
return <form action={action}>...</form>;
```

**Key concept:** The form's `action` prop directly calls the server function. No need to create API routes for mutations!

---

## 9. Route Handlers (API Routes)

For data fetching from client components, we use Route Handlers (`route.ts` files):

```
app/api/profile/route.ts      -> GET /api/profile
app/api/experience/route.ts   -> GET /api/experience
app/api/education/route.ts    -> GET /api/education
app/api/courses/route.ts      -> GET /api/courses
app/api/skills/route.ts       -> GET /api/skills
```

**Example:**
```tsx
// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { readData } from "@/app/_lib/store";

export async function GET() {
  const data = await readData();
  return NextResponse.json(data.personalInfo);
}
```

**When to use Route Handlers vs Server Actions:**
- **Server Actions** = for mutations (create, update, delete) triggered by forms
- **Route Handlers** = for GET requests from client components (`fetch("/api/...")`)

---

## 10. `generateMetadata` (Dynamic SEO)

Each page can export metadata for SEO. Dynamic pages use `generateMetadata`:

```tsx
// app/(public)/projects/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await readData();
  const project = data.projects.find((p) => p.slug === slug);

  return {
    title: `${project.title} — AbdEl-Rahman Sabry`,
    description: project.description,
  };
}
```

**Static metadata (simpler):**
```tsx
// app/(public)/page.tsx
export const metadata: Metadata = {
  title: "AbdEl-Rahman Sabry — Software Engineer",
  description: "...",
};
```

---

## 11. `next/image` (Image Optimization)

The `<Image>` component from `next/image` automatically optimizes images (lazy loading, correct sizing, format conversion).

```tsx
// app/(public)/_components/hero.tsx
import Image from "next/image";

<Image
  src={info.avatarUrl}     // "/AbdoSabryImage.png"
  alt={info.name}
  fill                     // fills the parent container
  className="object-cover"
  priority                 // loads immediately (above the fold)
/>
```

**Key props:**
- `fill` — image fills parent (parent must be `relative` with defined size)
- `priority` — disables lazy loading for above-the-fold images
- `width`/`height` — required for non-fill images

---

## 12. `next/link` (Client-Side Navigation)

`<Link>` enables instant client-side navigation without full page reloads:

```tsx
import Link from "next/link";

<Link href="/projects">Projects</Link>
<Link href={`/projects/${project.slug}`}>View Project</Link>
```

Used throughout the Header, project cards, dashboard sidebar, etc.

---

## 13. `next/navigation` Utilities

**`redirect(url)`** — server-side redirect (used in Server Actions):
```tsx
// After login
await createSession();
redirect("/dashboard");
```

**`notFound()`** — triggers the 404 page:
```tsx
const project = data.projects.find((p) => p.slug === slug);
if (!project) notFound();
```

**`usePathname()`** — client hook for current URL (used for active nav highlighting):
```tsx
const pathname = usePathname();
const isActive = pathname === item.href;
```

**Files:**
- `app/_lib/actions/auth.ts` — uses `redirect`
- `app/(public)/projects/[slug]/page.tsx` — uses `notFound`
- `app/(dashboard)/dashboard/_components/sidebar.tsx` — uses `usePathname`

---

## 14. `cookies()` (Authentication)

Next.js provides async `cookies()` for reading/writing HTTP cookies on the server:

```tsx
// app/_lib/auth.ts
import { cookies } from "next/headers";

// Write a cookie
const cookieStore = await cookies();
cookieStore.set("portfolio_session", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

// Read a cookie
const token = cookieStore.get("portfolio_session")?.value;
```

**Important Next.js 16 change:** `cookies()` is async — you must `await` it!

---

## 15. `revalidatePath()` (Cache Busting)

After mutations (create/update/delete), `revalidatePath` tells Next.js to regenerate cached pages:

```tsx
// After updating a project
await writeData(data);
revalidatePath("/projects");                    // refresh projects listing
revalidatePath(`/projects/${project.slug}`);    // refresh this project's detail page
revalidatePath("/");                            // refresh homepage
```

Without this, users would see stale data after dashboard edits.

---

## 16. Private Folders (`_folderName`)

Folders prefixed with `_` are excluded from routing. They're for organizing components that belong to a route segment:

```
app/_components/          -> shared components (not a route)
app/_lib/                 -> utilities, types, data (not a route)
app/(public)/_components/ -> homepage section components (not a route)
app/(dashboard)/dashboard/_components/ -> dashboard components (not a route)
```

---

## 17. `next/font` (Font Optimization)

Next.js automatically optimizes Google Fonts with zero layout shift:

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

The font is self-hosted at build time (no external requests at runtime).

---

## 18. Environment Variables

`.env.local` stores secrets that are only available on the server:

```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=change-this-to-a-random-secret-string
```

Access with `process.env.JWT_SECRET`. These are **never** sent to the browser.

---

## Summary Table

| Feature | Where Used | Purpose |
|---------|-----------|---------|
| App Router | `app/` folder structure | File-based routing |
| Route Groups | `(public)`, `(auth)`, `(dashboard)` | Organize without affecting URLs |
| Layouts | `layout.tsx` files | Shared UI wrappers |
| Server Components | All components by default | Zero-JS server rendering |
| Client Components | `"use client"` files | Interactivity (state, events) |
| Dynamic Routes | `[slug]`, `[id]` folders | URL parameters |
| `generateStaticParams` | `projects/[slug]/page.tsx` | Pre-build dynamic pages |
| Server Actions | `app/_lib/actions/*.ts` | Server-side mutations from forms |
| Route Handlers | `app/api/*/route.ts` | API endpoints for GET requests |
| `generateMetadata` | Dynamic pages | SEO per page |
| `next/image` | Hero section | Image optimization |
| `next/link` | Navigation everywhere | Client-side routing |
| `redirect` / `notFound` | Auth, detail pages | Server-side navigation |
| `cookies()` | Auth system | Session management |
| `revalidatePath` | All server actions | Cache invalidation |
| Private folders | `_components`, `_lib` | Non-routable organization |
| `next/font` | Root layout | Optimized font loading |
| Env variables | `.env.local` | Server-only secrets |
