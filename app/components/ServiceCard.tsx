import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group relative bg-[var(--background-dark)] border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:border-[var(--accent-purple)] hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2">
      <div className="mb-6 text-[var(--accent-purple)] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[var(--accent-purple)] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[var(--text-gray)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
