export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
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
  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);

    return Response.json(
      {
        customers: 0,
        totalInvoices: 0,
        unpaidInvoices: 0,
        totalRevenue: 0,
        error: "Dashboard stats failed",
      },
      { status: 200 }
    );
  }
}