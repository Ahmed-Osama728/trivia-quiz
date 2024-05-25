import { useState, useEffect, useRef, useCallback } from 'react';

const useCountdownTimer = (initialTime, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef(null); 

  const tick = useCallback(() => {
    setTimeLeft((prevTime) => {
      if (prevTime === 1) {
        clearInterval(intervalRef.current); 
        onTimeout(); 
        return 0;
      }
      return prevTime - 1;
    });
  }, [onTimeout]);

  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current); 
  }, [tick]);

  return timeLeft;
};

export default useCountdownTimer;
