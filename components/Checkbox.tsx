"use client";

import { useState } from "react";

const Checkbox = ({ label }: { label: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <div className="checkbox-container" onClick={toggleCheckbox}>
        <input type="checkbox" checked={isChecked} className="hidden" />
        <div className={`checkbox ${isChecked ? "checked" : ""}`}>
          {isChecked && <span className="checkmark">&#10003;</span>}
        </div>
      </div>
      <label
        className="ml-2 cursor-pointer text-xs font-medium"
        onClick={toggleCheckbox}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
