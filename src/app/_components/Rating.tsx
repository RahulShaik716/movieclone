export default function Rating({ rating }: { rating: number }) {
  return (
    <svg
      className="absolute h-full w-full"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        className="text-gray-300"
        stroke="currentColor"
        strokeWidth="3"
        fill="transparent"
        r="16"
        cx="18"
        cy="18"
      />
      {/* Progress Circle */}
      <circle
        className="text-green-500"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round" // Makes the ends of the stroke rounded
        fill="transparent"
        r="16"
        cx="18"
        cy="18"
        strokeDasharray="100"
        strokeDashoffset={`${100 - rating * 10}`} // Smoothly calculates the offset
        style={{
          transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease", // Smooth animation
        }}
      />
    </svg>
  );
}
