export const dynamic = "force-dynamic";

let customers = [];

export async function GET() {
  return Response.json(customers);
}

export async function POST(req) {
  const body = await req.json();

  const customer = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  customers.unshift(customer);

  return Response.json(customer);
}

export async function PUT(req) {
  const body = await req.json();

  customers = customers.map((customer) =>
    customer.id === body.id ? { ...customer, ...body } : customer
  );

  return Response.json({ success: true });
}

export async function DELETE(req) {
  const body = await req.json();

  customers = customers.filter((customer) => customer.id !== body.id);

  return Response.json({ success: true });
}