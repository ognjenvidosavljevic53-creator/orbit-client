import React from 'react';

interface PlanetLogoProps {
  className?: string;
  size?: number;
}

export const PlanetLogo: React.FC<PlanetLogoProps> = ({ className = 'w-6 h-6', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Orbit ringed planet emblem"
    >
      {/* Outer subtle orbital trajectory accent */}
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="7"
        transform="rotate(-26 24 24)"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        opacity="0.4"
      />

      {/* Main elliptical ring back half */}
      <path
        d="M6.2 32.8C2.5 31.0 2.2 27.5 5.5 25.0C9.6 21.9 17.5 19.8 26.2 19.3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Planet solid core with hairline rim */}
      <circle
        cx="24"
        cy="24"
        r="11"
        fill="#000000"
        stroke="currentColor"
        strokeWidth="2.2"
      />

      {/* High-contrast inner lunar highlight crescent */}
      <path
        d="M21 15C25.5 16.5 28.5 20.5 28.5 25.5C28.5 28.5 27.2 31.2 25 33"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Main elliptical ring front half passing in front of planet */}
      <path
        d="M21.5 28.6C30.5 28.2 38.8 26.3 42.8 23.2C46.1 20.7 45.8 17.2 42.1 15.4C37.8 13.3 29.5 12.8 20.5 14.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Crisp satellite point */}
      <circle cx="39" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
};
