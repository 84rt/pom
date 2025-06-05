
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
const SPRINT_WORK_TIME = 5 * 60; // 5 minutes in seconds
const SPRINT_BREAK_TIME = 1 * 60; // 1 minute in seconds

interface TaskHistoryItem {
  id: string;
  task: string;
  completed: boolean;
  timestamp: Date;
}

const Index = () => {
  const [isSprintMode, setIsSprintMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [initialTime, setInitialTime] = useState(WORK_TIME);
  const [currentTask, setCurrentTask] = useState('');
  const [taskHistory, setTaskHistory] = useState<TaskHistoryItem[]>([]);
  const [showTaskCompletion, setShowTaskCompletion] = useState(false);
  const [pendingTask, setPendingTask] = useState('');

  // Get current session durations based on mode
  const getWorkTime = () => isSprintMode ? SPRINT_WORK_TIME : WORK_TIME;
  const getBreakTime = () => isSprintMode ? SPRINT_BREAK_TIME : BREAK_TIME;

  // Calculate progress percentage
  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  // Handle sprint mode toggle
  const handleSprintModeToggle = useCallback(() => {
    setIsSprintMode(prev => {
      const newMode = !prev;
      const newWorkTime = newMode ? SPRINT_WORK_TIME : WORK_TIME;
      
      // Reset timer when switching modes
      setIsActive(false);
      setIsWorkSession(true);
      setTimeLeft(newWorkTime);
      setInitialTime(newWorkTime);
      setCurrentTask('');
      
      return newMode;
    });
  }, []);

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
      
      // Switch sessions when timer hits zero
      if (isWorkSession) {
        // Work session ended, switch to break
        setIsWorkSession(false);
        const breakTime = getBreakTime();
        setTimeLeft(breakTime);
        setInitialTime(breakTime);
        // Continue running the timer for the break session
        setIsActive(true);
      } else {
        // Break session ended, switch to work but stop the timer
        setIsWorkSession(true);
        const workTime = getWorkTime();
        setTimeLeft(workTime);
        setInitialTime(workTime);
        // Stop the timer so user needs to enter a new task
        setIsActive(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isWorkSession, currentTask, isSprintMode]);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsWorkSession(true);
    const workTime = getWorkTime();
    setTimeLeft(workTime);
    setInitialTime(workTime);
    setCurrentTask('');
  }, [isSprintMode]);

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

  const handleTaskInputEnter = useCallback(() => {
    if (currentTask.trim() !== '' && !isActive && isWorkSession) {
      toggleTimer();
    }
  }, [currentTask, isActive, isWorkSession, toggleTimer]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
            Choose mode:
          </p>
        </div>

        <SessionIndicator 
          isWorkSession={isWorkSession} 
          isSprintMode={isSprintMode}
          onSprintModeToggle={handleSprintModeToggle}
          disabled={isActive}
        />
        
        {isWorkSession && (
          <TaskInput 
            value={currentTask}
            onChange={setCurrentTask}
            disabled={isActive}
            onEnterPress={handleTaskInputEnter}
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
          {isSprintMode ? 'SPRINT: 5MIN • BREAK: 1MIN' : 'WORK: 25MIN • BREAK: 5MIN'}
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
