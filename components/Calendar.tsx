import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isBefore,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day: Date) => {
    if (!isBefore(day, new Date())) {
      setSelectedDate(day);
    }
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-between items-center mb-2'>
        <button
          onClick={handlePreviousMonth}
          className='text-gray-500'
        >
          &lt;
        </button>
        <span className='text-lg font-semibold'>
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={handleNextMonth}
          className='text-gray-500'
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className='grid grid-cols-7 mb-2'>
        {days.map((day, index) => (
          <div
            key={index}
            className='text-center text-gray-600'
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isDisabled = isBefore(cloneDay, today);
        const isSelected = selectedDate && isSameDay(cloneDay, selectedDate);

        days.push(
          <div
            key={day.toString()}
            className={`text-center p-2 cursor-pointer ${
              isDisabled ? 'text-gray-400' : 'text-gray-900'
            } ${isSelected ? 'bg-blue-500 text-white' : ''} ${
              !isDisabled ? 'hover:bg-blue-100' : ''
            }`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{format(day, 'd')}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          key={day.toString()}
          className='grid grid-cols-7'
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className='w-full max-w-md mx-auto mt-5 p-4 border rounded-lg shadow-lg'>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
