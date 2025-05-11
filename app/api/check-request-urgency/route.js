export async function POST(request) {
  const formData = await request.formData();
  const description = formData.get('issue');
  // Call validate-urgency internally (or via fetch in a real app)
  const urgentKeywords = ['emergency', 'urgent', 'leak', 'fire', 'flood', 'broken'];
  const isUrgent = urgentKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  );
  console.log('Maintenance Request:', { description, priority: isUrgent ? 'High' : 'Normal' });
  return new Response(null, {
    status: 308,
    headers: { Location: '/thank-you' },
  });
}