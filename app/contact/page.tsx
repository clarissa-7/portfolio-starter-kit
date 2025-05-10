import React from 'react';

interface ContactDetailsProps {
  email: string;
  phone: string;
  instagram: string;
  address: string; // Added address
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ email, phone, instagram, address }) => {
  return (
    <div>
      <h2>General Inquiries</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <h2>Phone</h2>
      <p>
        Phone: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <h2>Instagram</h2>
      <p>
        Instagram: <a href={`https://instagram.com/${instagram}`}>@{instagram}</a>
      </p>
      <h2>Address</h2>
      <p>{address}</p>
    </div>
  );
};

const ContactPage = () => {
  // Access environment variables (make sure they are defined)
  const email = process.env.CONTACT_EMAIL || 'info@example.com'; // Provide defaults
  const phone = process.env.CONTACT_PHONE || '+1234567890';
  const instagram = process.env.CONTACT_INSTAGRAM || 'mycompany';
  const address = process.env.CONTACT_ADDRESS || '123 Main St, Anytown, USA'; // Default Address

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

export default ContactPage;
