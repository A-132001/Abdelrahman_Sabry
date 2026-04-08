import { Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
import type { PersonalInfo } from "@/app/_lib/types";

export function Contact({ info }: { info: PersonalInfo }) {
  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Have a project in mind? Let's talk."
      className="bg-surface"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact info */}
        <AnimateOnScroll>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology. Feel free
              to reach out through any of the channels below.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-glow text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-glow text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {info.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {info.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !h-10 !px-4 !text-sm"
                >
                  {link.platform}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Contact form */}
        <AnimateOnScroll delay={2}>
          <form className="card-elevated space-y-5 p-6 sm:p-8">
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
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
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
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
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
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Send size={16} />
              Send Message
            </button>
          </form>
        </AnimateOnScroll>
      </div>
    </Section>
  );
}
