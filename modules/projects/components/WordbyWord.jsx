import { useEffect, useState } from "react";

export default function WordByWordText({
  text,
  interval = 180,
}) {
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= words.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((v) => v + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [visibleCount, words.length, interval]);

  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <span
          key={i}
          className={`
            inline-block
            transition-all
            duration-200
            ease-out
            ${i < visibleCount
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1"}
          `}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}