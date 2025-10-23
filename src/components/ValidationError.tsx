import React from "react";
import "./ValidationError.css";

interface ValidationErrorProps {
  errors: string[];
  show?: boolean;
}

const ValidationError: React.FC<ValidationErrorProps> = ({
  errors,
  show = true,
}) => {
  if (!show || !errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="validation-error">
      <div className="validation-error-header">
        <span className="validation-error-icon">⚠️</span>
        <span className="validation-error-title">Errores de validación:</span>
      </div>
      <ul className="validation-error-list">
        {errors.map((error, index) => (
          <li key={index} className="validation-error-item">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationError;
