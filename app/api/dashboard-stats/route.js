export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customers = await prisma.customer.count({
    where: { userId },
  });

  const invoices = await prisma.invoice.findMany({
    where: { userId },
  });

  const totalInvoices = invoices.length;

  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status === "Unpaid"
  ).length;

  const totalRevenue = invoices.reduce((sum, invoice) => {
    return sum + Number(invoice.amount || 0);
  }, 0);

  return Response.json({
    customers,
    totalInvoices,
    unpaidInvoices,
    totalRevenue,
  });
}
