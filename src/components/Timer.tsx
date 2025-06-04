
import React from 'react';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isActive }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div 
        className="text-8xl md:text-9xl font-bold text-white mb-4 transition-all duration-300 font-mono"
        style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
