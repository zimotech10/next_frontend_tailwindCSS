import React, { useState, useEffect } from 'react';

type CountdownTimerProps = {
  startTime: number | undefined;
  endTime: number | undefined; // Target time as a Unix timestamp (in seconds)
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime, endTime }) => {
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
    const days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
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

  const { days, hours, minutes, secs } = formatTime(timeLeft);

  return (
    <div
      className='flex flex-col items-center text-white bg-black p-4 rounded-lg'
      style={{
        border: '1px solid transparent',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'border-box',
        backgroundImage: 'linear-gradient(#000, #000), linear-gradient(to right, #000000 0%, #EEAF0D 80%, #000000 10%, #000000 0%, #EEAF0D 80%, #000000 100%)',
      }}
    >
      {isStartedAuction() ? (
        timeLeft > 0 ? (
          <>
            <h1 className='text-xl mb-2'>Auction ends in</h1>
            <div className='flex md:space-x-8 space-x-6'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-yellow-500'>{days}</div>
                <div
                  className='text-sm mt-1 '
                  style={{
                    color: '#798694',
                    margin: '1px',
                  }}
                >
                  days
                </div>
              </div>
              <div className='text-4xl font-bold' style={{ color: '#2e2101' }}>
                :
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-yellow-500'>{hours}</div>
                <div
                  className='text-sm mt-1'
                  style={{
                    color: '#798694',
                    margin: '1px',
                  }}
                >
                  hrs
                </div>
              </div>
              <div className='text-4xl font-bold' style={{ color: '#2e2101' }}>
                :
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-yellow-500'>{minutes}</div>
                <div
                  className='text-sm mt-1'
                  style={{
                    color: '#798694',
                    margin: '1px',
                  }}
                >
                  mins
                </div>
              </div>
              <div className='text-4xl font-bold' style={{ color: '#2e2101' }}>
                :
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-yellow-500'>{secs}</div>
                <div
                  className='text-sm mt-1'
                  style={{
                    color: '#798694',
                    margin: '1px',
                  }}
                >
                  secs
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1 className='text-2xl'>Finished Auction!</h1>
        )
      ) : (
        <h1 className='text-2xl'>Starting from {unixTimeToDateAndTime(Number(startTime))}!</h1>
      )}
    </div>
  );
};

export default CountdownTimer;
