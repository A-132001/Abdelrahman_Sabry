import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import type { PersonalInfo } from "@/app/_lib/types";

export function Hero({ info }: { info: PersonalInfo }) {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Animated orbs */}
      <div
        className="hero-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "10%",
          left: "15%",
          background:
            "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))",
          animationDelay: "0s",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          right: "10%",
          background:
            "linear-gradient(135deg, var(--gradient-mid), var(--gradient-end))",
          animationDelay: "-5s",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: "300px",
          height: "300px",
          top: "50%",
          left: "50%",
          background:
            "linear-gradient(135deg, var(--gradient-end), var(--gradient-start))",
          animationDelay: "-10s",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20" />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_65%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Profile image */}
        <div className="mb-6 inline-block">
          <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-accent/30 shadow-lg sm:h-32 sm:w-32">
            <Image
              src={info.avatarUrl}
              alt={info.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Available for work &mdash; {info.location}
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Hi, I&apos;m{" "}
          <span className="text-gradient">{info.name.split(" ")[0]}</span>
          <br />
          <span className="text-muted-foreground">{info.title}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {info.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={info.resumeUrl} className="btn-primary" download>
            <Download size={16} />
            Download CV
          </a>
          <a href="#contact" className="btn-secondary">
            <Mail size={16} />
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card/60 p-2 text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-accent hover:text-accent"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
