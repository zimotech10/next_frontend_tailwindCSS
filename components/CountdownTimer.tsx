import React, { useState, useEffect } from 'react';

type CountdownTimerProps = {
  startTime: number;
  endTime: number; // Target time as a Unix timestamp (in seconds)
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  startTime,
  endTime,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());

  useEffect(() => {
    if (isStartedAuction()) {
      const timerId = setInterval(() => {
        const timeRemaining = calculateTimeLeft();
        setTimeLeft(timeRemaining);

        if (timeRemaining <= 0) {
          clearInterval(timerId); // Stop the timer when the countdown reaches zero
        }
      }, 1000);

      return () => clearInterval(timerId); // Cleanup on component unmount
    }
  }, [startTime, endTime]);

  const isStartedAuction = () => {
    const startTimeInMs = startTime * 1000;
    const difference = new Date().getTime() - startTimeInMs;
    return difference > 0;
  };

  function calculateTimeLeft(): number {
    const targetTimeInMs = endTime * 1000; // Convert Unix timestamp to milliseconds
    const difference = targetTimeInMs - new Date().getTime();
    return Math.max(difference / 1000, 0); // Return time left in seconds
  }

  const formatTime = (seconds: number) => {
    let hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const days = hours / 24;
    hours = hours % 24;

    return `${String(days).padStart(2, '0')}:${String(hours).padStart(
      2,
      '0'
    )}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className='text-center text-white bg-gray-800 p-4 rounded-md'>
      {isStartedAuction() ? (
        timeLeft > 0 ? (
          <h1 className='text-2xl'>Time Remaining: {formatTime(timeLeft)}</h1>
        ) : (
          <h1 className='text-2xl'>Finished Auction!</h1>
        )
      ) : (
        <h1 className='text-2xl'>Starting soon!</h1>
      )}
    </div>
  );
};

export default CountdownTimer;
