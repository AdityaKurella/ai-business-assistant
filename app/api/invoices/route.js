export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const invoices = await prisma.invoice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(invoices);
}

export async function POST(req) {
  const body = await req.json();

  const invoice = await prisma.invoice.create({
    data: {
      client: body.client,
      service: body.service,
      amount: body.amount,
      status: body.status || "Unpaid",
    },
  });

  return Response.json(invoice);
}

export async function DELETE(req) {
  const body = await req.json();

  await prisma.invoice.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({ success: true });
}