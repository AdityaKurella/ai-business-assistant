export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();

  return Response.json({
    success: true,
    saved: false,
    message: "Demo mode: message received but not saved to database.",
    data: body,
  });
}