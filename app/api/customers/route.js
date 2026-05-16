import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(customers);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to fetch customers",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
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
    return Response.json(
      {
        error: "Failed to create customer",
      },
      {
        status: 500,
      }
    );
  }
}