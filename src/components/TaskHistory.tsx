
import React from 'react';
import { Check, X } from 'lucide-react';

interface TaskHistoryItem {
  id: string;
  task: string;
  completed: boolean;
  timestamp: Date;
}

interface TaskHistoryProps {
  tasks: TaskHistoryItem[];
  isWorkSession: boolean;
}

const TaskHistory: React.FC<TaskHistoryProps> = ({ tasks, isWorkSession }) => {
  if (tasks.length === 0) return null;

  const visibleTasks = tasks.slice(0, 5);

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider text-left ${
        isWorkSession ? 'text-white' : 'text-black'
      }`}>
        SESSION HISTORY
      </h3>
      <div className="space-y-2">
        {visibleTasks.map((task, index) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 border rounded transition-opacity duration-1000 ${
              isWorkSession 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-gray-100 border-gray-300'
            } ${
              index >= 3 ? 'opacity-50' : index >= 4 ? 'opacity-25' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-1 rounded ${task.completed ? 'bg-green-600' : 'bg-red-600'}`}>
                {task.completed ? (
                  <Check className="h-3 w-3 text-white" />
                ) : (
                  <X className="h-3 w-3 text-white" />
                )}
              </div>
              <span className={`font-mono text-sm truncate ${
                isWorkSession ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {task.task}
              </span>
            </div>
            <span className={`text-xs font-mono ${
              isWorkSession ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {task.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskHistory;
