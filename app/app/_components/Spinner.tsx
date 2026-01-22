export default function Spinner({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full h-32 w-32 border-b-2 border-white ${className}`}
      ></div>
      <p className="text-white mt-4">{message}</p>
    </div>
  );
}
