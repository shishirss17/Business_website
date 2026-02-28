import * as React from 'react';

interface WelcomeEmailProps {
    email: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
    email,
}) => (
    <div style={{
        fontFamily: 'sans-serif',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #eee'
    }}>
        <h1 style={{ color: '#333' }}>Welcome to CuddleCart! 🧸</h1>
        <p>Hi there,</p>
        <p>Thank you for subscribing to our newsletter! We're thrilled to have you as part of our community.</p>
        <p>You'll be the first to know about:</p>
        <ul>
            <li>New huggable arrivals</li>
            <li>Special flash sales</li>
            <li>Exclusive subscriber discounts</li>
        </ul>
        <p>Stay soft,</p>
        <p><strong>The CuddleCart Team</strong></p>
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '20px 0' }} />
        <p style={{ fontSize: '12px', color: '#888' }}>
            You are receiving this email because you subscribed to the CuddleCart newsletter with {email}.
        </p>
    </div>
);
