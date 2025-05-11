export const runtime = 'edge';

export async function GET() {
  // Placeholder: In a real app, increment a counter in a lightweight store (e.g., Vercel KV)
  console.log('Maintenance request submitted');
  return new Response(JSON.stringify({ message: 'Request logged' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}