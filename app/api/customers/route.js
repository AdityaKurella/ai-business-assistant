import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customers = await prisma.customer.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(customers);
}

export async function POST(req) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const customer = await prisma.customer.create({
    data: {
      userId,
      name: body.name || "",
      company: body.company || "",
      email: body.email || "",
      status: body.status || "New",
      value: body.value || "",
      notes: body.notes || "",
    },
  });

  return Response.json(customer);
}

export async function PUT(req) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const customer = await prisma.customer.updateMany({
    where: {
      id: body.id,
      userId,
    },
    data: {
      name: body.name,
      company: body.company,
      email: body.email,
      status: body.status,
      value: body.value,
      notes: body.notes,
    },
  });

  return Response.json(customer);
}

export async function DELETE(req) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await prisma.customer.deleteMany({
    where: {
      id: body.id,
      userId,
    },
  });

  return Response.json({ success: true });
}