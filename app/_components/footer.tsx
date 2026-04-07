import { ExternalLink } from "lucide-react";
import { readData } from "@/app/_lib/store";

export async function Footer() {
  const data = await readData();
  const { personalInfo } = data;

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
          reserved.
        </p>

        <div className="flex items-center gap-4">
          {personalInfo.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.platform}
            >
              {link.platform}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
