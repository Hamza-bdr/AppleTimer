"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Bell, CirclePause, CirclePlay, CircleX } from "lucide-react";
import { useEffect } from "react";
export default function TimerComponent({ timer, onPause, onDelete }) {
  const { id, duration, timeLeft, endAt, isRunning } = timer;
  const audio = new Audio("/ring.mp3");

  useEffect(() => {
    if (timeLeft === 0) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [timeLeft]);

  const millisecondsToHMS = (ms) => {
    if (!ms) return "N/A";
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return { hrs, mins, secs };
  };
  const padHMS = (hms) => {
    return {
      hrs: String(hms.hrs).padStart(2, "0"),
      mins: String(hms.mins).padStart(2, "0"),
      secs: String(hms.secs).padStart(2, "0"),
    };
  };
  const getTimeText = (ms) => {
    if (!ms) return "N/A";
    const hms = millisecondsToHMS(ms);
    const padded = padHMS(hms);
    return `${padded?.hrs}:${padded?.mins}:${padded?.secs}`;
  };
  const formatMs = (ms) => {
    const date = new Date(ms);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(
      2,
      "0"
    )}:${String(date.getSeconds()).padStart(2, "0")}`;
  };
  return (
    <motion.div
      className={clsx("m-10 p-5 border-1 w-fit h-fit bg-gray-800 rounded-lg", {
        "brightness-75": timeLeft === 0,
      })}
      animate={timeLeft === 0 ? { y: [0, 5, 0, 5, 0] } : {}}
      transition={
        timeLeft === 0 ? { duration: 0.5, repeat: 3, repeatType: "loop" } : {}
      }
    >
      <div
        className="radial-progress flex flex-col justify-center items-center"
        style={{
          "--value": (timeLeft / duration) * 100,
          "--size": "12rem",
          "--thickness": "2px",
        }}
        aria-valuenow={(timeLeft / duration) * 100}
        role="progressbar"
      >
        <span className="text-1xl ">{getTimeText(duration)}</span>
        <span className="text-4xl ">{getTimeText(timeLeft)}</span>
        <span className="text-2xl">{formatMs(endAt)} </span>
        <span>
          {isRunning ? "En cours" : timeLeft === 0 ? "Terminé" : "En pause"}
        </span>
      </div>
      <div className="flex justify-between space-x-2 mt-4">
        <button onClick={() => onPause(id)} className="p-2 rounded-full">
          {timeLeft !== 0 ? (
            isRunning ? (
              <CirclePause size={30} />
            ) : (
              <CirclePlay size={30} />
            )
          ) : (
            <Bell size={20} />
          )}
        </button>
        <button onClick={() => onDelete(id)} className=" rounded-full">
          <CircleX size={30} />
        </button>
      </div>
    </motion.div>
  );
}
