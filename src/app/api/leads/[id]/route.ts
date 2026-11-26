import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const { status } = body;

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureDbInitialized();
    await prisma.lead.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
