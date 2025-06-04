
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Clock } from 'lucide-react';

interface SprintModeToggleProps {
  isSprintMode: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const SprintModeToggle: React.FC<SprintModeToggleProps> = ({ 
  isSprintMode, 
  onToggle, 
  disabled = false 
}) => {
  return (
    <div className="mb-6">
      <Button
        onClick={onToggle}
        disabled={disabled}
        variant="outline"
        className={`font-mono text-xs px-6 py-2 transition-all duration-200 uppercase tracking-wider font-bold ${
          isSprintMode 
            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20' 
            : 'border-gray-600 text-white hover:bg-gray-800'
        } disabled:opacity-50`}
      >
        {isSprintMode ? (
          <>
            <Zap className="mr-2 h-3 w-3" />
            SPRINT MODE
          </>
        ) : (
          <>
            <Clock className="mr-2 h-3 w-3" />
            NORMAL MODE
          </>
        )}
      </Button>
    </div>
  );
};

export default SprintModeToggle;
