
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  canStart?: boolean;
  isWorkSession: boolean;
}

const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset, canStart = true, isWorkSession }) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={onToggle}
        disabled={!canStart}
        size="lg"
        className={`font-mono text-sm px-8 py-3 transition-all duration-200 uppercase tracking-wider font-bold disabled:opacity-50 ${
          isWorkSession 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isActive ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            PAUSE
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            START
          </>
        )}
      </Button>
      
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className={`font-mono text-sm px-8 py-3 transition-all duration-200 uppercase tracking-wider font-bold ${
          isWorkSession 
            ? 'border-gray-400 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white' 
            : 'border-gray-600 bg-transparent text-gray-700 hover:bg-gray-200 hover:text-black'
        }`}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        RESET
      </Button>
    </div>
  );
};

export default Controls;
