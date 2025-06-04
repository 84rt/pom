
import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import Controls from '../components/Controls';
import SessionIndicator from '../components/SessionIndicator';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [initialTime, setInitialTime] = useState(WORK_TIME);

  // Calculate progress percentage
  const progress = (timeLeft / initialTime) * 100;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
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
  }, [isActive, timeLeft, isWorkSession]);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_TIME);
    setInitialTime(WORK_TIME);
  }, []);

  // Play notification sound when session switches (optional)
  useEffect(() => {
    if (timeLeft === 0) {
      // You could add a notification sound here
      console.log(`Session switched to: ${isWorkSession ? 'Work' : 'Break'}`);
    }
  }, [isWorkSession, timeLeft]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="timer-font text-4xl md:text-5xl font-bold text-white mb-4">
            Pomodoro Timer
          </h1>
          <p className="timer-font text-gray-400 text-lg">
            Stay focused, take breaks, be productive
          </p>
        </div>

        <SessionIndicator isWorkSession={isWorkSession} />
        
        <Timer timeLeft={timeLeft} isActive={isActive} />
        
        <ProgressBar progress={progress} isWorkSession={isWorkSession} />
        
        <Controls 
          isActive={isActive} 
          onToggle={toggleTimer} 
          onReset={resetTimer} 
        />

        <div className="mt-12 timer-font text-gray-500 text-sm">
          <p>Work: 25 minutes • Break: 5 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
