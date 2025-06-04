
import React from 'react';
import { Coffee, Briefcase } from 'lucide-react';

interface SessionIndicatorProps {
  isWorkSession: boolean;
}

const SessionIndicator: React.FC<SessionIndicatorProps> = ({ isWorkSession }) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
        isWorkSession 
          ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
          : 'border-blue-500 bg-blue-500/10 text-blue-400'
      }`}>
        {isWorkSession ? (
          <>
            <Briefcase className="h-6 w-6" />
            <span className="timer-font text-xl font-medium">Work Session</span>
          </>
        ) : (
          <>
            <Coffee className="h-6 w-6" />
            <span className="timer-font text-xl font-medium">Break Time</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionIndicator;
