
import React from 'react';

interface ProgressBarProps {
  progress: number;
  isWorkSession: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isWorkSession }) => {
  const barColor = isWorkSession ? 'bg-orange-500' : 'bg-blue-500';
  const glowColor = isWorkSession ? 'shadow-orange-500/50' : 'shadow-blue-500/50';

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${barColor} ${glowColor} shadow-lg transition-all duration-1000 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
