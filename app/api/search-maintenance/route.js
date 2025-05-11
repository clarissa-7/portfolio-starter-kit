export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get('unit') || 'unknown';
  // Placeholder: Return mock data
  return new Response(
    JSON.stringify({ message: `No maintenance requests found for unit ${unit}` }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}