const ContactPage = () => {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@example.com';
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1234567890';
  const instagram = process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || 'mycompany';
  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '123 Main St, Anytown, USA';

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Here are the best ways to get in touch with us:</p>
      <ContactDetails
        email={email}
        phone={phone}
        instagram={instagram}
        address={address}
      />
    </div>
  );
};
