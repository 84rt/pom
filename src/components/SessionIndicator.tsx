
import React from 'react';
import { Zap, Clock } from 'lucide-react';

interface SessionIndicatorProps {
  isWorkSession: boolean;
  isSprintMode: boolean;
  onSprintModeToggle: () => void;
  disabled?: boolean;
}

const SessionIndicator: React.FC<SessionIndicatorProps> = ({ 
  isWorkSession, 
  isSprintMode, 
  onSprintModeToggle,
  disabled = false 
}) => {
  if (!isWorkSession) {
    return (
      <div className="mb-8">
        <div className="inline-block px-6 py-2 bg-blue-100 border border-blue-600 rounded font-mono text-xs text-blue-800 uppercase tracking-wider font-bold">
          <Clock className="inline mr-2 h-3 w-3" />
          BREAK TIME
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <button
        onClick={onSprintModeToggle}
        disabled={disabled}
        className={`inline-block px-6 py-2 border rounded font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
          isSprintMode
            ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
            : 'bg-orange-900/30 border-orange-400 text-orange-400 hover:bg-orange-400/20'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSprintMode ? (
          <>
            <Zap className="inline mr-2 h-3 w-3" />
            SPRINT MODE
          </>
        ) : (
          <>
            <Clock className="inline mr-2 h-3 w-3" />
            WORK SESSION
          </>
        )}
      </button>
    </div>
  );
};

export default SessionIndicator;
