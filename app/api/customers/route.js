import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(customers);
}

export async function POST(req) {
  const body = await req.json();

  const customer = await prisma.customer.create({
    data: {
      name: body.name,
      company: body.company,
      email: body.email,
      status: body.status || "Active",
      value: body.value || "",
      notes: body.notes || "",
    },
  });

  return Response.json(customer);
}

export async function PUT(req) {
  const body = await req.json();

  const customer = await prisma.customer.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      company: body.company,
      email: body.email,
      status: body.status,
      value: body.value || "",
      notes: body.notes || "",
    },
  });

  return Response.json(customer);
}

export async function DELETE(req) {
  const body = await req.json();

  await prisma.customer.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({ success: true });
}