import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  await prisma.message.create({
    data: {
      role: body.role,
      content: body.content,
    },
  });

  return Response.json({ success: true });
}