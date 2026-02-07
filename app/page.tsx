'use client';

import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";

// Product Card Component
function ProductCard({ 
  title, 
  description, 
  icon, 
  url, 
  features 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  url: string;
  features: string[];
}) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="product-card h-full">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-purple-bg)] flex items-center justify-center mb-6 text-[var(--accent-purple)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-[var(--text-muted)] text-sm">
              <svg className="w-4 h-4 mr-2 text-[var(--accent-purple)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex items-center text-[var(--accent-purple)] font-semibold">
          Learn More
          <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// Service Card Component
function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 card-hover">
      <div className="w-14 h-14 rounded-xl bg-[var(--accent-purple-bg)] flex items-center justify-center mb-5 text-[var(--accent-purple)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/ecsvault-logo-light.png"
              alt="ECSVault Logo"
              width={210}
              height={70}
              className="h-12 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">About</a>
            <a href="#products" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">Products</a>
            <a href="#services" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">Services</a>
            <button onClick={scrollToContact} className="btn-primary text-sm py-2 px-4">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--accent-purple)] rounded-full filter blur-[150px] opacity-10"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[var(--accent-purple-dark)] rounded-full filter blur-[150px] opacity-10"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/ecsvault-logo-light.png"
              alt="ECSVault Logo"
              width={500}
              height={167}
              priority
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)] animate-fade-in-up leading-tight">
            Empowering Businesses Through<br />
            <span className="text-[var(--accent-purple)]">Secure Cloud, Automation & AI</span>
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Modern solutions that combine security, performance, and intelligence. 
            Transform your business with our suite of products and services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button onClick={scrollToProducts} className="btn-primary">
              Explore Our Products
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              Get in Touch
            </button>
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
      <section id="about" className="py-24 px-6 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--accent-purple)] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[var(--text-primary)]">
              Elevate Cyber Solutions
            </h2>
            <div className="w-24 h-1 bg-[var(--gradient-purple)] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">Elevate Cyber Solutions</strong>, led by <strong className="text-[var(--accent-purple)]">Bismark Castilla</strong>, is a trusted partner for businesses seeking to modernize their infrastructure and strengthen their security posture. We specialize in <strong className="text-[var(--text-primary)]">Cloud Infrastructure, Cybersecurity, DevOps, and AI Automation</strong>, delivering tailored solutions that drive efficiency and innovation.
            </p>

            <p>
              Our mission is built on core values that guide every engagement: <strong className="text-[var(--text-primary)]">Integrity</strong> in our approach, <strong className="text-[var(--text-primary)]">Innovation</strong> in our solutions, <strong className="text-[var(--text-primary)]">Security First</strong> in our designs, <strong className="text-[var(--text-primary)]">Collaboration</strong> with our clients, and <strong className="text-[var(--text-primary)]">Excellence</strong> in execution.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "50+", label: "Projects Delivered" },
              { number: "99.9%", label: "Uptime Guaranteed" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[var(--accent-purple)]">{stat.number}</div>
                <div className="text-[var(--text-muted)] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--accent-purple)] font-semibold text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[var(--text-primary)]">
              Solutions That Drive Growth
            </h2>
            <div className="w-24 h-1 bg-[var(--gradient-purple)] mx-auto mt-6 rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-6">
              Discover our suite of products designed to transform your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              title="Elevate Commerce"
              description="A complete e-commerce platform built for modern businesses. Manage inventory, process orders, and grow your online presence."
              url="https://ecommerce.ecsvault.com"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              features={[
                "Inventory Management",
                "Order Processing",
                "Customer Analytics",
                "Multi-currency Support"
              ]}
            />

            <ProductCard
              title="BotFlow"
              description="AI-powered chatbot platform that automates customer interactions. Connect via WhatsApp, Telegram, and more."
              url="https://botflow.ecsvault.com"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
              features={[
                "AI-Powered Responses",
                "Multi-Channel Support",
                "Appointment Booking",
                "24/7 Availability"
              ]}
            />

            <ProductCard
              title="Security Services"
              description="Comprehensive cybersecurity solutions including assessments, compliance, and managed security services."
              url="https://cybersecurity.ecsvault.com"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              features={[
                "Security Assessments",
                "Compliance Management",
                "Incident Response",
                "Penetration Testing"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--accent-purple)] font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[var(--text-primary)]">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-[var(--gradient-purple)] mx-auto mt-6 rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-6">
              Comprehensive solutions designed to secure, scale, and accelerate your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
              title="Cloud Architecture"
              description="Secure, scalable, and cost-efficient cloud environments tailored to your business needs."
            />

            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Cybersecurity"
              description="Zero Trust architecture, IAM solutions, and regulatory compliance to protect your assets."
            />

            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              title="DevOps & Automation"
              description="Accelerated delivery through CI/CD pipelines and infrastructure-as-code practices."
            />

            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
              title="Elevate AI — Business Chatbots"
              description="AI-powered customer service across WhatsApp, Telegram, and your website. 50+ languages, voice support, 5-minute setup. Plans from $19/mo."
              link="https://ai.ecsvault.com"
            />

            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Managed Services"
              description="Ongoing monitoring, disaster recovery, and optimization for peace of mind."
            />

            <ServiceCard
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--accent-purple)] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[var(--text-primary)]">
              Let&apos;s Build Something Great
            </h2>
            <div className="w-24 h-1 bg-[var(--gradient-purple)] mx-auto mt-6 rounded-full"></div>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-6">
              Ready to transform your infrastructure? Get in touch with our team and let&apos;s discuss how we can help.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Image
                src="/ecsvault-logo-light.png"
                alt="ECSVault Logo"
                width={200}
                height={67}
                className="mb-4"
              />
              <p className="text-[var(--text-secondary)] mb-4 max-w-sm">
                Empowering businesses through secure cloud, automation, and AI solutions.
              </p>
              <p className="text-[var(--text-muted)] text-sm">
                Lot 205 Thomas Street, Kitty<br />
                Georgetown, Guyana
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Products</h3>
              <ul className="space-y-3">
                <li><a href="https://ecommerce.ecsvault.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">Elevate Commerce</a></li>
                <li><a href="https://botflow.ecsvault.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">BotFlow</a></li>
                <li><a href="https://cybersecurity.ecsvault.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">Security Services</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:sales@ecsvault.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">
                    sales@ecsvault.com
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/bismarkcastilla" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--card-border)] pt-8 text-center text-[var(--text-muted)]">
            <p>&copy; 2025 Elevate Cyber Solutions. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
