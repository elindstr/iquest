import { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimerEnd, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(countdown);
          onTimerEnd();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); // clean up on dismount
  }, [isRunning, onTimerEnd]);

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
