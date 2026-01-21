export default function Button({
  children,
  type,
  onClick,
  className,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`${className} bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-80 transition-opacity cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
