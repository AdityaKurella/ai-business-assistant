export const dynamic = "force-dynamic";

async function getPrisma() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

export async function GET() {
  try {
    const prisma = await getPrisma();

    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(customers);
  } catch (error) {
    return Response.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const prisma = await getPrisma();
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
  } catch (error) {
    return Response.json({ error: "Failed to create customer" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const prisma = await getPrisma();
    const body = await req.json();

    const customer = await prisma.customer.update({
      where: { id: body.id },
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
  } catch (error) {
    return Response.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const prisma = await getPrisma();
    const body = await req.json();

    await prisma.customer.delete({
      where: { id: body.id },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}