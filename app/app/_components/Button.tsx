export default function Button({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
    >
      {children}
    </button>
  );
}
