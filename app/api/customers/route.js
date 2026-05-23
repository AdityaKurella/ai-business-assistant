export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { prisma } = await import("@/lib/prisma");

    const { userId } = await auth();

    if (!userId) {
      return Response.json([], { status: 200 });
    }

    const customers = await prisma.customer.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(customers);
  } catch (error) {
    console.error("CUSTOMERS GET ERROR:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req) {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { prisma } = await import("@/lib/prisma");

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
        status: body.status || "Lead",
        value: body.value || "",
        notes: body.notes || "",
      },
    });

    return Response.json(customer);
  } catch (error) {
    console.error("CUSTOMERS POST ERROR:", error);
    return Response.json({ error: "Customer create failed" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { prisma } = await import("@/lib/prisma");

    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await prisma.customer.updateMany({
      where: {
        id: body.id,
        userId,
      },
      data: {
        name: body.name || "",
        company: body.company || "",
        email: body.email || "",
        status: body.status || "Lead",
        value: body.value || "",
        notes: body.notes || "",
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("CUSTOMERS PUT ERROR:", error);
    return Response.json({ error: "Customer update failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { prisma } = await import("@/lib/prisma");

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
  } catch (error) {
    console.error("CUSTOMERS DELETE ERROR:", error);
    return Response.json({ error: "Customer delete failed" }, { status: 500 });
  }
}