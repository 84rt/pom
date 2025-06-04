
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';

interface TaskCompletionProps {
  task: string;
  onComplete: (completed: boolean) => void;
}

const TaskCompletion: React.FC<TaskCompletionProps> = ({ task, onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-md w-full mx-4">
        <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
          SESSION COMPLETE
        </h3>
        <p className="text-gray-300 mb-6 font-mono">
          "{task}"
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Did you complete this task?
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => onComplete(true)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono uppercase"
          >
            <Check className="mr-2 h-4 w-4" />
            DONE
          </Button>
          <Button
            onClick={() => onComplete(false)}
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-mono uppercase"
          >
            <X className="mr-2 h-4 w-4" />
            NOT DONE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletion;
