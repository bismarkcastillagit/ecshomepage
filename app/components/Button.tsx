import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: "bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple-hover)] shadow-lg hover:shadow-xl hover:shadow-purple-500/50",
    secondary: "bg-transparent border-2 border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)] hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
