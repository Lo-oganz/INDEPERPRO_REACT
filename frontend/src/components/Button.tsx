import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
  <button className={className || 'button'} onClick={onClick}>
    {children}
  </button>
);

export default Button;