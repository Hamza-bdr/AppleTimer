export default function TimerInput({ value, handleChange, label }) {
  return (
    <>
      <input
        name={label}
        className="countdown font-mono text-8xl w-1/4 h-18 text-center bg-transparent"
        defaultValue={value}
        onChange={handleChange}
        maxLength={2}
      />
      <label>{label}</label>
    </>
  );
}
