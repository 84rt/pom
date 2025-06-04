
import React from 'react';
import { Coffee, Briefcase } from 'lucide-react';

interface SessionIndicatorProps {
  isWorkSession: boolean;
}

const SessionIndicator: React.FC<SessionIndicatorProps> = ({ isWorkSession }) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded border-2 transition-all duration-300 font-mono ${
        isWorkSession 
          ? 'border-orange-400 bg-orange-400/10 text-orange-400' 
          : 'border-blue-400 bg-blue-400/10 text-blue-400'
      }`}>
        {isWorkSession ? (
          <>
            <Briefcase className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">WORK SESSION</span>
          </>
        ) : (
          <>
            <Coffee className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">BREAK TIME</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionIndicator;
