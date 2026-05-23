export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(invoices);
  } catch (error) {
    console.error("INVOICES GET ERROR:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        client: body.client || "",
        service: body.service || "",
        amount: body.amount || "",
        status: body.status || "Unpaid",
      },
    });

    return Response.json(invoice);
  } catch (error) {
    console.error("INVOICES POST ERROR:", error);
    return Response.json({ error: "Invoice create failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await prisma.invoice.deleteMany({
      where: {
        id: body.id,
        userId,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("INVOICES DELETE ERROR:", error);
    return Response.json({ error: "Invoice delete failed" }, { status: 500 });
  }
}