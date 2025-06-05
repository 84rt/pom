
import React from 'react';

interface ProgressBarProps {
  progress: number;
  isWorkSession: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isWorkSession }) => {
  const barColor = isWorkSession ? 'bg-orange-400' : 'bg-blue-600';
  const glowColor = isWorkSession ? 'shadow-orange-400/50' : 'shadow-blue-600/50';
  const trackColor = isWorkSession ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300';

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className={`w-full rounded-full h-2 overflow-hidden border transition-all duration-500 ${trackColor}`}>
        <div
          className={`h-full ${barColor} ${glowColor} shadow-lg transition-all duration-1000 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
