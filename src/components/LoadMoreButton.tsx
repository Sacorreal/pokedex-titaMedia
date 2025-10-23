import React from "react";
import "../styles/LoadMoreButton.css";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

const LoadMoreButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  label = "Cargar más",
}) => {
  return (
    <div className="load-more-container">
      <button
        className="load-more-button"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default LoadMoreButton;
