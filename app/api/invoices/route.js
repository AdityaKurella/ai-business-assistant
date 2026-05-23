import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(invoices);
}

export async function POST(req) {
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
}

export async function DELETE(req) {
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
}