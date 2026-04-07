import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Section } from "@/app/_components/section";
import type { PersonalInfo } from "@/app/_lib/types";

export function Contact({ info }: { info: PersonalInfo }) {
  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Have a project in mind? Let's talk."
      className="bg-muted/40"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Contact info */}
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m always interested in hearing about new opportunities,
            collaborations, or just having a chat about technology. Feel free to
            reach out through any of the channels below.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${info.email}`}
                  className="text-sm font-medium text-foreground hover:text-accent"
                >
                  {info.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Location
                </p>
                <p className="text-sm font-medium text-foreground">
                  {info.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-8 flex gap-3">
            {info.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {link.platform}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </Section>
  );
}
