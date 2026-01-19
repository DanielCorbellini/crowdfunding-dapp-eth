export default function Spinner({ message }: { message: string }) {
  return (
    <div>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      <p className="text-white mt-4">{message}</p>
    </div>
  );
}
