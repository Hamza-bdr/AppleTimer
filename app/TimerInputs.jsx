import TimerInput from "./TimerInput";
export default function Timer({ timer, handleChange }) {
  return (
    <>
      <TimerInput
        label={"heure"}
        value={timer.heure}
        handleChange={handleChange}
      />
      <TimerInput
        label={"minute"}
        value={timer.minute}
        handleChange={handleChange}
      />
      <TimerInput
        label={"seconde"}
        value={timer.seconde}
        handleChange={handleChange}
      />
    </>
  );
}
