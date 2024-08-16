import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

type NotificationProps = {
  variant: 'default' | 'success' | 'warning' | 'danger';
  heading: string;
  content: string;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ variant, heading, content, onClose }) => {
  const [visible, setVisible] = useState(true);

  const variantStyles: Record<typeof variant, string> = {
    default: 'bg-[#F2F2F2] text-white border-2 border-[#F2F2F2]',
    success: 'bg-[#3BF1A5] text-white border-2 border-[#3BF1A5]',
    warning: 'bg-[#FFB703] text-white border-2 border-[#FFB703]',
    danger: 'bg-[#FF856A] text-white border-2 border-[#FF856A]',
  };

  const headingStyles: Record<typeof variant, string> = {
    default: 'text-[#F2F2F2]',
    success: 'text-[#3BF1A5]',
    warning: 'text-[#FFB703]',
    danger: 'text-[#FF856A]',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Wait for the animation to finish before removing
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex justify-between items-center rounded-lg shadow-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${
        variantStyles[variant]
      } relative w-80 mb-4 pl-[4px]`}
    >
      <div className='flex justify-between rounded-r-lg p-4 bg-[#393838] w-80'>
        <div>
          <h4 className={`font-bold ${headingStyles[variant]}`}>{heading}</h4>
          <p className='text-sm opacity-80'>{content}</p>
        </div>
        <button className='text-lg opacity-50 hover:opacity-100 transition-opacity' onClick={onClose}>
          <Icon icon='mdi:close' />
        </button>
      </div>
    </div>
  );
};

export default Notification;
