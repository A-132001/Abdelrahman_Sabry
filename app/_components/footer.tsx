import { ExternalLink } from "lucide-react";
import { readData } from "@/app/_lib/store";

export async function Footer() {
  const data = await readData();
  const { personalInfo } = data;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-lg font-bold text-foreground">
              AT<span className="text-gradient">.</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {personalInfo.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {personalInfo.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm text-muted-foreground transition-all hover:border-accent hover:text-accent hover:shadow-sm"
                aria-label={link.platform}
              >
                {link.platform}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with
            Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
