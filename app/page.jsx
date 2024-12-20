"use client";
import { useState } from "react";
import TimerInput from "./TimerInput";
import TimerInputs from "./TimerInputs";
import TimerComponent from "./TimerComponent";
// import { create } from "zustand";

function useTimerStore() {
  const [timers, setTimers] = useState([]);
  const [timer, setTimer] = useState({});
  const [intervalId, setIntervalId] = useState(null);
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
  function startTimer(timer) {
    setTimer((prev) => ({ ...prev, isRunning: true }));
    const id = setInterval(() => {
      setTimer((prev) => {
        const newTimeLeft = prev.timeLeft - 1000;
        if (newTimeLeft <= 0) {
          clearInterval(id);
          return {
            ...prev,
            timeLeft: 0,
            isRunning: false,
          };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);
    setIntervalId(id);
    console.log(timer);
  }
  function addTimer(e) {
    const duration =
      timerInputs?.seconde * 1000 +
      timerInputs?.minute * 60000 +
      timerInputs?.heure * 3600000;
    const endAt = Date.now() + duration;
    const timeLeft = Math.max(0, endAt - Date.now());
    const newTimer = createTimer(1, duration, timeLeft, endAt, false);
    startTimer(newTimer);
    setTimer(newTimer);
    setTimers([...timers, newTimer]);
    // console.log(e, duration, timeLeft, endAt);
    // console.log(timers, "timerss");
  }

  return { addTimer, createTimer, timerInputs, setTimerInputs, timers, timer };
}
export default function Home() {
  const { addTimer, createTimer, timerInputs, setTimerInputs, timers, timer } =
    useTimerStore();

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
          {/* {timers?.map((timer, index) => ( */}
          {timer && <TimerComponent timer={timer}></TimerComponent>}
          {/* ))} */}
        </div>
      )}
    </main>
  );
}
