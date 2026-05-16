export async function GET() {
  return Response.json({
    reply: "This is a demo AI response 🚀",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return Response.json({ error: "message is required" }, { status: 400 });
    }

    return Response.json({
      reply: `Echo: ${message}`,
    });
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}