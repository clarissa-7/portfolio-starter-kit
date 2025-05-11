export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const unit = formData.get('unit');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const issue = formData.get('issue');
  const location = formData.get('location');
  const permission = formData.get('permission');

  // Check urgency (same logic as validate-urgency edge function)
  const urgentKeywords = ['emergency', 'urgent', 'leak', 'fire', 'flood', 'broken'];
  const isUrgent = urgentKeywords.some(keyword => 
    issue.toLowerCase().includes(keyword)
  );
  const priority = isUrgent ? 'High' : 'Normal';

  // Log data (placeholder; add storage later)
  console.log('Maintenance Request:', { name, unit, email, phone, issue, location, permission, priority });

  // Return JSON response instead of redirect
  return new Response(
    JSON.stringify({ message: 'Maintenance request submitted successfully' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}