import React from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

interface NotificationProps {
  message1: string;
  message2: string;
  icon: string;
}

const Notification: React.FC<NotificationProps> = ({ message1, message2, icon }) => {
  return (
    <div className='flex flex-col items-center text-neutral-500 text-xl p-6'>
      <Icon icon={icon} width={50} height={50} className='text-yellow-500' />
      <p className='font-semibold mt-4'>{message1}</p>
      <p>{message2}</p>
    </div>
  );
};

export default Notification;
