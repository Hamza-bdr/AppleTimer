"use client";
import { useState, useEffect } from "react";
import TimerInput from "./TimerInput";
import TimerInputs from "./TimerInputs";
import TimerComponent from "./TimerComponent";

function useTimerStore() {
  const [timers, setTimers] = useState([]);
  const [timer, setTimer] = useState({});
  const [timerInputs, setTimerInputs] = useState({
    heure: "00",
    minute: "01",
    seconde: "00",
  });
  const createTimer = (id, duration, timeLeft, endAt, isRunning) => {
    return {
      id,
      duration,
      timeLeft,
      endAt,
      isRunning,
    };
  };
  function startTimer(timerId) {
    const id = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((prev) => {
          if (prev.id === timerId) {
            const newTimeLeft = Math.max(0, prev.timeLeft - 1000);
            if (newTimeLeft === 0) {
              clearInterval(id);
            }
            return { ...prev, timeLeft: newTimeLeft };
          }
          return prev;
        })
      );
    }, 1000);
  }

  function addTimer(e) {
    const duration =
      timerInputs?.seconde * 1000 +
      timerInputs?.minute * 60000 +
      timerInputs?.heure * 3600000;
    const endAt = Date.now() + duration;
    const timeLeft = Math.max(0, endAt - Date.now());
    const newTimer = createTimer(
      timers.length + 1,
      duration,
      timeLeft,
      endAt,
      false
    );
    setTimers([...timers, newTimer]);
    startTimer(newTimer.id);
  }

  return {
    addTimer,
    createTimer,
    timerInputs,
    setTimerInputs,
    timers,
    startTimer,
  };
}
export default function Home() {
  const { addTimer, timerInputs, setTimerInputs, timers } = useTimerStore();

  function handleChange(e) {
    const { name, value } = e.target;
    // const formattedValue = formatTimeValue(value, name === "heure" ? 23 : 59);
    setTimerInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className="flex h-screen flex-col justify-center items-center">
      <div className="flex flex-row border-2 mb-3 justify-center items-center rounded-md w-2/4 h-52 bg-slate-600">
        <TimerInputs timer={timerInputs} handleChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={addTimer}>
        Add timer
      </button>
      {timers.length > 0 && (
        <div className="grid grid-cols-3 m-4 p-4">
          {timers.map((timer, index) => (
            <TimerComponent key={index} timer={timer}></TimerComponent>
          ))}
        </div>
      )}
    </main>
  );
}
