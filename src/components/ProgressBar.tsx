
import React from 'react';

interface ProgressBarProps {
  progress: number;
  isWorkSession: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isWorkSession }) => {
  const barColor = isWorkSession ? 'bg-orange-400' : 'bg-blue-400';
  const glowColor = isWorkSession ? 'shadow-orange-400/50' : 'shadow-blue-400/50';

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
        <div
          className={`h-full ${barColor} ${glowColor} shadow-lg transition-all duration-1000 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
