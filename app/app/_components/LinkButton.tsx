import Link from "next/link";

export default function LinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href}>
      <button
        className={`cursor-pointer rounded-xl bg-gray-100 py-2.5 text-sm font-bold text-gray-900 transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      >
        {children}
      </button>
    </Link>
  );
}
