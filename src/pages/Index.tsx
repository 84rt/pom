
import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import Controls from '../components/Controls';
import SessionIndicator from '../components/SessionIndicator';
import TaskInput from '../components/TaskInput';
import TaskHistory from '../components/TaskHistory';
import TaskCompletion from '../components/TaskCompletion';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

interface TaskHistoryItem {
  id: string;
  task: string;
  completed: boolean;
  timestamp: Date;
}

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [initialTime, setInitialTime] = useState(WORK_TIME);
  const [currentTask, setCurrentTask] = useState('');
  const [taskHistory, setTaskHistory] = useState<TaskHistoryItem[]>([]);
  const [showTaskCompletion, setShowTaskCompletion] = useState(false);
  const [pendingTask, setPendingTask] = useState('');

  // Calculate progress percentage
  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorkSession && currentTask) {
        // Work session ended, ask about task completion
        setPendingTask(currentTask);
        setShowTaskCompletion(true);
        setCurrentTask('');
      }
      
      // Auto-switch sessions when timer hits zero
      setIsWorkSession(prev => !prev);
      const nextSessionTime = isWorkSession ? BREAK_TIME : WORK_TIME;
      setTimeLeft(nextSessionTime);
      setInitialTime(nextSessionTime);
      // Continue running the timer for the next session
      setIsActive(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isWorkSession, currentTask]);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_TIME);
    setInitialTime(WORK_TIME);
    setCurrentTask('');
  }, []);

  const handleTaskCompletion = useCallback((completed: boolean) => {
    if (pendingTask) {
      const newHistoryItem: TaskHistoryItem = {
        id: Date.now().toString(),
        task: pendingTask,
        completed,
        timestamp: new Date(),
      };
      setTaskHistory(prev => [newHistoryItem, ...prev]);
    }
    setShowTaskCompletion(false);
    setPendingTask('');
  }, [pendingTask]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            FOCUS SESSION
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider">
            GET SHIT DONE
          </p>
        </div>

        <SessionIndicator isWorkSession={isWorkSession} />
        
        {isWorkSession && (
          <TaskInput 
            value={currentTask}
            onChange={setCurrentTask}
            disabled={isActive}
          />
        )}
        
        <Timer timeLeft={timeLeft} isActive={isActive} />
        
        <ProgressBar progress={progress} isWorkSession={isWorkSession} />
        
        <Controls 
          isActive={isActive} 
          onToggle={toggleTimer} 
          onReset={resetTimer}
          canStart={!isWorkSession || currentTask.trim() !== ''}
        />

        <div className="mt-8 text-gray-500 text-xs uppercase tracking-wider">
          WORK: 25MIN • BREAK: 5MIN
        </div>

        <TaskHistory tasks={taskHistory} />

        {showTaskCompletion && (
          <TaskCompletion
            task={pendingTask}
            onComplete={handleTaskCompletion}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
