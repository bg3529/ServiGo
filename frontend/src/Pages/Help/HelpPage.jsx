import React from 'react';
import './HelpPage.css';

export default function HelpPage() {
    return (
        <div className="help-container">
            <div className="help-header">
                <h1>How can we help you?</h1>
                {/* <div className="search-help">
                    <input type="text" placeholder="Search for answers..." />
                </div> */}
            </div>

            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>

                <div className="faq-grid">
                    <div className="faq-item">
                        <h3>How do I book a service?</h3>
                        <p>Browse categories or search for a service, select a provider, and click "Book Now". You can manage bookings in your dashboard.</p>
                    </div>

                    {/* <div className="faq-item">
                        <h3>Is payment secure?</h3>
                        <p>Yes, all payments are processed securely. We currently support cash on delivery and digital wallets.</p>
                    </div> */}

                    <div className="faq-item">
                        <h3>How can I become a provider?</h3>
                        <p>To list your services, please contact our support team or use the "Become a Pro" link in your profile settings (coming soon).</p>
                    </div>

                    <div className="faq-item">
                        <h3>Can I cancel a booking?</h3>
                        <p>Yes, you can cancel a booking from your "My Bookings" page up to 24 hours before the scheduled time.</p>
                    </div>
                </div>
            </section>

            <section className="contact-support">
                <h3>Still need help?</h3>
                <p>Contact us at <a href="mailto:support@servigo.com">mail@rajivkhanal.com.np</a></p>
            </section>
        </div>
    );
}
