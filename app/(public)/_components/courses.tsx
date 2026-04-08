import { BookOpen, ArrowUpRight, Award } from "lucide-react";
import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
import type { Course } from "@/app/_lib/types";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function CoursesSection({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <Section
      id="courses"
      title="Courses & Certifications"
      subtitle="Continuous learning and professional development."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <AnimateOnScroll
            key={course.id}
            delay={(index % 4) as 0 | 1 | 2 | 3}
          >
            <div className="card-elevated flex h-full flex-col p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-glow text-accent">
                  <BookOpen size={18} />
                </div>
                {course.certificateUrl && (
                  <a
                    href={course.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-md bg-accent-glow px-2 py-1 text-xs font-semibold text-accent transition-opacity hover:opacity-80"
                  >
                    <Award size={12} />
                    Certificate
                  </a>
                )}
              </div>

              <h3 className="font-semibold text-card-foreground">
                {course.title}
              </h3>
              <p className="text-gradient mt-1 text-sm font-semibold">
                {course.provider}
              </p>

              {course.description && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatDate(course.completedDate)}
                </span>
                {course.url && (
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    View Course
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
