import { ArrowDown, Download, Mail } from "lucide-react";
import type { PersonalInfo } from "@/app/_lib/types";

export function Hero({ info }: { info: PersonalInfo }) {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-4 inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          {info.location}
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Hi, I&apos;m{" "}
          <span className="text-accent">{info.name.split(" ")[0]}</span>
          <br />
          {info.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {info.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={info.resumeUrl}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Download size={16} />
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
