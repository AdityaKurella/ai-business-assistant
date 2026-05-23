export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const chartData = months.map((month) => ({
      month,
      revenue: 0,
    }));

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex < 6) {
        chartData[monthIndex].revenue += Number(invoice.amount || 0);
      }
    });

    return Response.json(chartData);
  } catch (error) {
    console.error("CHART API ERROR:", error);

    return Response.json(
      [
        { month: "Jan", revenue: 0 },
        { month: "Feb", revenue: 0 },
        { month: "Mar", revenue: 0 },
        { month: "Apr", revenue: 0 },
        { month: "May", revenue: 0 },
        { month: "Jun", revenue: 0 },
      ],
      { status: 200 }
    );
  }
}