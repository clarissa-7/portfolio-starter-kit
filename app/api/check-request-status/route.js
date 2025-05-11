export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get('requestId') || 'unknown';
  // Placeholder: In a real app, check requestId in a store (e.g., Vercel KV)
  const message = requestId === 'unknown' 
    ? 'Please provide a valid request ID' 
    : `Status for request ${requestId}: Logged`;
  return new Response(
    JSON.stringify({ message }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}