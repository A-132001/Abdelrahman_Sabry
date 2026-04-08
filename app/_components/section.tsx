import { AnimateOnScroll } from "./animate-on-scroll";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <AnimateOnScroll>
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
                <span className="text-gradient">.</span>
              </h2>
              {subtitle && (
                <p className="mt-3 text-lg text-muted-foreground">
                  {subtitle}
                </p>
              )}
              <div className="bg-gradient-accent mt-4 h-1 w-12 rounded-full" />
            </div>
          </AnimateOnScroll>
        )}
        {children}
      </div>
    </section>
  );
}
