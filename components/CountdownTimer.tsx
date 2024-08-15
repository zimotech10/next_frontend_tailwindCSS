import React, { useState, useEffect } from 'react';

type CountdownTimerProps = {
  startTime: number | undefined;
  endTime: number | undefined; // Target time as a Unix timestamp (in seconds)
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
    if (startTime) {
      const startTimeInMs = startTime * 1000;
      const difference = new Date().getTime() - startTimeInMs;
      return difference > 0;
    }
  };

  function calculateTimeLeft(): number {
    if (endTime) {
      const targetTimeInMs = endTime * 1000; // Convert Unix timestamp to milliseconds
      const difference = targetTimeInMs - new Date().getTime();
      return Math.max(difference / 1000, 0);
    } // Return time left in seconds
    return 0;
  }

  const formatTime = (seconds: number) => {
    let hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(secs).padStart(2, '0')}`;
  };

  const unixTimeToDateAndTime = (unixTime: number): string => {
    const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date and time string
    return `${year}-${month}-${day} ${hours}:${minutes}`;
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
        <h1 className='text-2xl'>
          Starting from {unixTimeToDateAndTime(Number(startTime))}!
        </h1>
      )}
    </div>
  );
};

export default CountdownTimer;
