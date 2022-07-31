import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "0.5rem 1rem",
      cursor: "pointer",
      background: "white",
      border: "1px solid gray",
    }}
  >
    {children}
  </button>
);
