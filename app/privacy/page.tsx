import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Teeside Properties',
  description: 'Read our privacy policy to understand how Teeside Properties collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Last updated: April 2026</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>1. Information We Collect</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
              We collect information you provide directly to us, including your name, email address, phone number, and property preferences when you:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>Create an account or submit a contact form</li>
              <li>Schedule a property viewing or virtual inspection</li>
              <li>List a property for management</li>
              <li>Use our mortgage calculator or financial tools</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>2. How We Use Your Information</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>Provide, maintain, and improve our services</li>
              <li>Match you with suitable properties based on your preferences</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations under Kenyan law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>3. Data Protection</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, secure payment processing through licensed escrow services, and regular security audits in compliance with the Kenya Data Protection Act, 2019.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>4. Third-Party Services</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We may share your information with trusted third parties who assist us in operating our platform, including payment processors (M-Pesa, banking partners), property verification services (ArdhiSasa), and communication tools. These parties are contractually obligated to keep your data confidential.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>5. Your Rights</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">Under the Kenya Data Protection Act, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>6. Cookies</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We use cookies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>7. Contact Us</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              If you have questions about this privacy policy, contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@teeside.co.ke" className="text-[var(--color-navy)] font-medium hover:underline">privacy@teeside.co.ke</a>{' '}
              or call <a href="tel:+254700000000" className="text-[var(--color-navy)] font-medium hover:underline">+254 700 000 000</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
