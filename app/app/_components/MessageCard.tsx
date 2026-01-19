export default function MessageCard({
  message,
  successfully,
}: {
  message: string;
  successfully: boolean;
}) {
  return (
    <div
      className={`mt-3 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm
        ${
          successfully
            ? "border-green-500/30 bg-green-500/10 text-green-400"
            : "border-red-500/30 bg-red-500/10 text-red-400"
        }`}
    >
      <svg
        className="h-5 w-5 shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            successfully
              ? "M5 13l4 4L19 7"
              : "M12 9v2m0 4h.01M5.64 5.64l12.72 12.72M12 2a10 10 0 100 20 10 10 0 000-20z"
          }
        />
      </svg>

      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
}
