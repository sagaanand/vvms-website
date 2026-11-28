import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import ProjectLayout3DClient from "@/components/ProjectLayout3DClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin 3D Master Layout Explorer | AUREON BREEZE | VVMS",
  robots: { index: false, follow: false },
};

export default async function AureonBreeze3DLayoutPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin");
  }

  await ensureDbInitialized();
  const project = await prisma.project.findUnique({
    where: { slug: "aureon-breeze" },
    include: {
      plots: {
        orderBy: [{ phase: "asc" }, { plotNumber: "asc" }],
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <ProjectLayout3DClient
      projectName={project.name}
      masterLayoutImage={
        project.masterLayoutImage || "/images/projects/aureon-breeze/master-layout.jpg"
      }
      plots={project.plots}
    />
  );
}
