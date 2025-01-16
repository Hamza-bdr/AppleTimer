import { CirclePause, CirclePlay, CircleX } from "lucide-react";
export default function TimerComponent({ timer, onPause, onDelete }) {
  const { id, duration, timeLeft, endAt, isRunning } = timer;

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
    <div className="m-10 p-5 border-1 bg-gray-800 rounded-lg">
      <div className="flex flex-col p-10 w-52 h-52 justify-center items-center border-2 rounded-full">
        <div className="text-1xl ">{getTimeText(duration)}</div>
        <div className="text-4xl ">{getTimeText(timeLeft)}</div>
        <div className="text-2xl">{formatMs(endAt)}</div>
        <div>{isRunning ? "En cours" : "Terminé"}</div>
        <div className="flex space-x-2 mt-4">
          <button onClick={() => onPause(id)} className="p-2 rounded-full">
            {isRunning ? <CirclePause size={30} /> : <CirclePlay size={30} />}
          </button>
          <button onClick={() => onDelete(id)} className=" rounded-full">
            <CircleX size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
