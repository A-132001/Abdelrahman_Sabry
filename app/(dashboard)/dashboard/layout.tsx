import { redirect } from "next/navigation";
import { verifySession } from "@/app/_lib/auth";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await verifySession();
  if (!isAuth) redirect("/login");

  return (
    <div className="flex min-h-[100dvh] flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
