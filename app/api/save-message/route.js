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

    const messages = await prisma.message.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(messages);
  } catch (error) {
    console.error("GET MESSAGE ERROR:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req) {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { prisma } = await import("@/lib/prisma");

    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const message = await prisma.message.create({
      data: {
        userId,
        role: body.role || "user",
        content: body.content || "",
      },
    });

    return Response.json(message);
  } catch (error) {
    console.error("SAVE MESSAGE ERROR:", error);

    return Response.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}