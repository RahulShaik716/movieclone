export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="cursor-pointer rounded bg-orange-700 px-2 py-1 text-white hover:bg-gray-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
