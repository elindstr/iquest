// I disconnected this to fix the console error. -Eric


import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialTime, onTimerEnd, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = onTimerEnd;
  }, [onTimerEnd]);

  useEffect(() => {
    if (!isRunning) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(countdown);
          if (savedCallback.current) savedCallback.current();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isRunning]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return (
    <div>
      <h2>Seconds left: {timeLeft}</h2>
    </div>
  );
};

export default Timer;
