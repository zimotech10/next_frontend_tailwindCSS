'use client';

import { useState } from 'react';

const Checkbox = ({ label, type, traitType, onCheckboxChange }: { label: string; type: string; traitType: string; onCheckboxChange: any }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (type === 'status') onCheckboxChange(label); // Notify parent component about the checkbox state change
    else if (type === 'attribute') onCheckboxChange({ trait_type: traitType, value: label });
  };

  return (
    <div className='flex items-center'>
      <div className='checkbox-container' onClick={toggleCheckbox}>
        <input type='checkbox' checked={isChecked} onChange={toggleCheckbox} className='hidden' />
        <div className={`checkbox ${isChecked ? 'checked' : ''}`}>{isChecked && <span className='checkmark'>&#10003;</span>}</div>
      </div>
      <label className='ml-2 cursor-pointer text-xs font-medium' onClick={toggleCheckbox}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
