
import React from 'react';
import { Input } from "@/components/ui/input";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <label className="block text-white text-sm font-bold mb-2 uppercase tracking-wider">
        WHAT ARE YOU WORKING ON?
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your task..."
        disabled={disabled}
        className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 font-mono focus:border-white focus:ring-white"
        maxLength={100}
      />
    </div>
  );
};

export default TaskInput;
