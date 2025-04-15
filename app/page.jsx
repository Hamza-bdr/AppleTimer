"use client";
import { useState } from "react";
import TimerComponent from "./TimerComponent";
import TimerInputs from "./TimerInputs";
import useTimerStore from "./useTimerStore";

export default function Main() {
  const {
    addTimer,
    timerInputs,
    setTimerInputs,
    timers,
    toggleTimerState,
    onDelete,
  } = useTimerStore();

  function handleChange(e) {
    const { name, value } = e.target;
    setTimerInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className="flex min-h-screen h-screen flex-col justify-center items-center ">
      <div className="flex flex-row border-2 mb-3 justify-center items-center rounded-md w-2/4 min-h-52 bg-slate-600">
        <TimerInputs timer={timerInputs} handleChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={addTimer}>
        Add timer
      </button>
      {timers.length > 0 && (
        <div className="flex flex-wrap justify-center w-3/4 h-2/4 rounded-md">
          {timers.map((timer, index) => (
            <TimerComponent
              key={index}
              timer={timer}
              onPause={toggleTimerState}
              onDelete={onDelete}
            ></TimerComponent>
          ))}
        </div>
      )}
    </main>
  );
}
