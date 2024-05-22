import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(countdown);
        onTimerEnd(); // Call a function when the timer ends
      }
    }, 1000);

    return () => clearInterval(countdown); // Clear the interval when the component unmounts
  }, [timeLeft, onTimerEnd]);

  return (
    <div>
      <h2>Seconds left: {timeLeft}</h2>
    </div>
  );
};

export default Timer;