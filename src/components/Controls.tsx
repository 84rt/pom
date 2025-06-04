
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset }) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={onToggle}
        size="lg"
        className="timer-font text-lg px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
      >
        {isActive ? (
          <>
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Start
          </>
        )}
      </Button>
      
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="timer-font text-lg px-8 py-3 border-gray-600 text-white hover:bg-gray-800 transition-all duration-200"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  );
};

export default Controls;
