import React from 'react';
import './Terms.css';

export default function Terms() {
    return (
        <div className="terms-container">
            <div className="terms-header">
                <h1>Terms & Conditions</h1>
                <p>Please read these terms carefully before using our service.</p>
            </div>

            <div className="terms-content">
                <section className="terms-section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to ServiGo. By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
                </section>

                <section className="terms-section">
                    <h2>2. User Accounts</h2>
                    <p>To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                    <p>You are responsible for safeguarding your password. You agree that you will not disclose your password to any third party and that you will take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.</p>
                </section>

                <section className="terms-section">
                    <h2>3. Service Providers</h2>
                    <p>Service Providers are independent contractors and not employees of ServiGo. ServiGo is not responsible for the quality, safety, or legality of the services provided by Service Providers.</p>
                </section>

                <section className="terms-section">
                    <h2>4. Bookings and Payments</h2>
                    <p>All bookings are subject to availability. Payment for services must be made in accordance with the payment methods supported by ServiGo. Prices are subject to change without notice.</p>
                </section>

                <section className="terms-section">
                    <h2>5. Cancellations and Refunds</h2>
                    <p>Cancellations may be subject to a cancellation fee. Refunds are processed according to our Refund Policy.</p>
                </section>

                <section className="terms-section">
                    <h2>6. Limitation of Liability</h2>
                    <p>In no event shall ServiGo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
                </section>

                <section className="terms-section">
                    <h2>7. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                </section>

                <section className="terms-contact">
                    <h3>Contact Us</h3>
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@servigo.com">legal@servigo.com</a></p>
                </section>
            </div>
        </div>
    );
}
