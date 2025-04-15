"use client";
import { useState, useRef } from "react";

export default function useTimerStore() {
  const [timers, setTimers] = useState([]);
  const [intervalIds, setIntervalIds] = useState({});
  const timerId = useRef(0);
  const [timerInputs, setTimerInputs] = useState({
    heure: "00",
    minute: "00",
    seconde: "20",
  });

  const createTimer = (id, duration, timeLeft, endAt, isRunning) => ({
    id,
    duration,
    timeLeft,
    endAt,
    isRunning,
  });

  const stopTimer = (timerId) => {
    clearInterval(intervalIds[timerId]);
    setIntervalIds((prev) => {
      const { [timerId]: _, ...rest } = prev;
      return rest;
    });
  };

  const startTimer = (timerId) => {
    if (intervalIds[timerId]) stopTimer(timerId);

    const id = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.id === timerId) {
            const newTimeLeft = Math.max(0, timer.timeLeft - 1000);
            if (newTimeLeft === 0) {
              stopTimer(timerId);
              return { ...timer, timeLeft: 0, isRunning: false };
            }
            return { ...timer, timeLeft: newTimeLeft, isRunning: true };
          }
          return timer;
        })
      );
    }, 1000);

    setIntervalIds((prev) => ({ ...prev, [timerId]: id }));
  };

  const addTimer = () => {
    const sec = parseInt(timerInputs.seconde || "0", 10);
    const min = parseInt(timerInputs.minute || "0", 10);
    const hr = parseInt(timerInputs.heure || "0", 10);

    const duration = hr * 3600000 + min * 60000 + sec * 1000;
    const endAt = Date.now() + duration;
    const timeLeft = Math.max(0, endAt - Date.now());

    const newTimer = createTimer(
      timerId.current++,
      duration,
      timeLeft,
      endAt,
      false
    );
    setTimers([...timers, newTimer]);
    startTimer(newTimer.id);
  };

  const onPause = (timerId) => {
    stopTimer(timerId);
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const toggleTimerState = (timerId) => {
    const target = timers.find((t) => t.id === timerId);
    if (!target) return;

    if (target.isRunning) {
      onPause(timerId);
    } else {
      startTimer(timerId);
    }
  };

  const onDelete = (timerId) => {
    stopTimer(timerId);
    setTimers((prevTimers) => prevTimers.filter((t) => t.id !== timerId));
  };

  return {
    addTimer,
    timerInputs,
    setTimerInputs,
    timers,
    startTimer,
    onPause,
    onDelete,
    toggleTimerState,
  };
}
