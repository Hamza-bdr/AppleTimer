export default function TimerComponent({ timer }) {
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
    <div className="flex flex-col justify-center items-center w-52 h-52 m-10 p-10 border-2 rounded-full ">
      <div className="text-1xl ">{getTimeText(duration)}</div>
      <div className="text-4xl ">{getTimeText(timeLeft)}</div>
      <div className="text-2xl">{formatMs(endAt)}</div>
      <div>{isRunning ? "En cours" : "Terminé"}</div>
    </div>
  );
}
