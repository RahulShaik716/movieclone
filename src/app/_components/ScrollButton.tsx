export default function ScrollButton({
  onClick,
  children,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 ${direction == "left" ? "left-0" : "right-0"} h-full -translate-y-1/2 rounded text-white shadow-md`}
    >
      {children}
    </button>
  );
}
