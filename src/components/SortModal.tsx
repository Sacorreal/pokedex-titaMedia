import React from "react";

type Props = {
  show: boolean;
  sortBy: "number" | "name";
  onClose: () => void;
  onChange: (newSort: "number" | "name") => void;
};

const SortModal: React.FC<Props> = ({ show, sortBy, onClose, onChange }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sort-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sort-title">Sort by:</div>
        <div className="sort-options">
          <label className="sort-option">
            <input
              type="radio"
              name="sort"
              value="number"
              checked={sortBy === "number"}
              onChange={() => onChange("number")}
            />
            <span>Number</span>
          </label>
          <label className="sort-option">
            <input
              type="radio"
              name="sort"
              value="name"
              checked={sortBy === "name"}
              onChange={() => onChange("name")}
            />
            <span>Name</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
