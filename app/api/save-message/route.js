import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(messages);
}

export async function POST(req) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const message = await prisma.message.create({
    data: {
      userId,
      role: body.role,
      content: body.content,
    },
  });

  return Response.json(message);
}
export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await prisma.message.deleteMany({
    where: { userId },
  });

  return Response.json({
    success: true,
  });
}