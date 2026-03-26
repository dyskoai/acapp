import React from 'react';

export const DyskoLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90H30V10H50Z" 
      fill="currentColor" 
    />
    <path 
      d="M45 30L48 45L63 48L48 51L45 66L42 51L27 48L42 45L45 30Z" 
      fill="#5EB38E" 
    />
  </svg>
);
