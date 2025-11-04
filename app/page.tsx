'use client';

import Image from "next/image";
import Button from "./components/Button";
import ServiceCard from "./components/ServiceCard";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-50"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-12 animate-fade-in">
            <Image
              src="/ecsvault-logo.png"
              alt="ECSVault Logo"
              width={600}
              height={200}
              priority
              className="mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-fade-in-up">
            Empowering Businesses Through Secure Cloud, Automation, and AI
          </h1>

          <p className="text-xl md:text-2xl text-[var(--text-gray)] mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Modern solutions that combine security, performance, and intelligence.
          </p>

          <div className="animate-fade-in-up animation-delay-400">
            <Button onClick={scrollToContact} variant="primary">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[var(--accent-purple)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-[var(--background-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-[var(--accent-purple)]">Elevate Cyber Solutions</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--text-gray)] leading-relaxed">
            <p>
              <strong className="text-white">Elevate Cyber Solutions</strong>, led by <strong className="text-[var(--accent-purple)]">Bismark Castilla</strong>, is a trusted partner for businesses seeking to modernize their infrastructure and strengthen their security posture. We specialize in <strong className="text-white">Cloud Infrastructure, Cybersecurity, DevOps, and AI Automation</strong>, delivering tailored solutions that drive efficiency and innovation.
            </p>

            <p>
              Our mission is built on core values that guide every engagement: <strong className="text-white">Integrity</strong> in our approach, <strong className="text-white">Innovation</strong> in our solutions, <strong className="text-white">Security First</strong> in our designs, <strong className="text-white">Collaboration</strong> with our clients, and <strong className="text-white">Excellence</strong> in execution. We don&apos;t just implement technology—we empower your business to thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-[var(--accent-purple)]">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-[var(--text-gray)] max-w-3xl mx-auto">
              Comprehensive solutions designed to secure, scale, and accelerate your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
              title="Cloud Architecture & Migration"
              description="Secure, scalable, and cost-efficient cloud environments tailored to your business needs."
            />

            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Cybersecurity & Compliance"
              description="Zero Trust architecture, IAM solutions, and regulatory compliance to protect your assets."
            />

            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              title="DevOps & Automation"
              description="Accelerated delivery through CI/CD pipelines and infrastructure-as-code practices."
            />

            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="AI Automation & Agents"
              description="Eliminate repetitive tasks with intelligent workflows and AI-powered automation."
            />

            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Managed Cloud & Security"
              description="Ongoing monitoring, disaster recovery, and optimization for peace of mind."
            />

            <ServiceCard
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Performance Optimization"
              description="Enhanced system performance, cost optimization, and scalability improvements."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[var(--background-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Let&apos;s Build Something <span className="text-[var(--accent-purple)]">Secure and Scalable</span> Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-[var(--text-gray)] max-w-3xl mx-auto">
              Ready to transform your infrastructure? Get in touch with our team and let&apos;s discuss how we can help you achieve your goals.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Elevate Cyber Solutions</h3>
              <p className="text-[var(--text-gray)] mb-2">
                Lot 205 Thomas Street, Kitty<br />
                Georgetown, Guyana
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="space-y-2">
                <a
                  href="mailto:sales@ecsvault.com"
                  className="block text-[var(--accent-purple)] hover:text-[var(--accent-purple-hover)] transition-colors duration-300"
                >
                  sales@ecsvault.com
                </a>
                <a
                  href="https://linkedin.com/in/bismarkcastilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[var(--accent-purple)] hover:text-[var(--accent-purple-hover)] transition-colors duration-300"
                >
                  LinkedIn: bismarkcastilla
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-[var(--text-gray)]">
            <p>&copy; 2025 Elevate Cyber Solutions. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
