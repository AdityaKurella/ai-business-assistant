export const dynamic = "force-dynamic";

let invoices = [];

export async function GET() {
  return Response.json(invoices);
}

export async function POST(req) {
  const body = await req.json();

  const invoice = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  invoices.unshift(invoice);

  return Response.json(invoice);
}

export async function DELETE(req) {
  const body = await req.json();

  invoices = invoices.filter((invoice) => invoice.id !== body.id);

  return Response.json({ success: true });
}