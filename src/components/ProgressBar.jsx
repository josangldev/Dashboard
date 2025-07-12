export default function ProgressBar({ value, label, dark }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className={dark ? "text-white" : "text-gray-700"}>{label}</span>
        <span className={dark ? "text-white" : "text-gray-700"}>{value}%</span>
      </div>
      <div className={`w-full h-3 rounded bg-gray-200 overflow-hidden ${dark ? "bg-gray-700" : "bg-gray-200"}`}>
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: value + "%" }}
        />
      </div>
    </div>
  );
} 