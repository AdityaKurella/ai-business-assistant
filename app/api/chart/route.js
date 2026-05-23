import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
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
}