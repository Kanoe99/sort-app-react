import React, { useRef, useEffect, useState } from "react";

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

const ScrollableNumberSelector = () => {
  const [activeIndex, setActiveIndex] = useState(5);
  const listRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  const centerActiveItem = () => {
    if (listRef.current) {
      const activeItem = listRef.current.children[
        activeIndex
      ] as HTMLDivElement;
      const parent = listRef.current;

      if (activeItem) {
        const parentRect = parent.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        parent.scrollTo({
          top:
            parent.scrollTop +
            (itemRect.top - parentRect.top) -
            parent.clientHeight / 2 +
            itemRect.height / 2,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    centerActiveItem(); // Center on mount
  }, []);

  useEffect(() => {
    centerActiveItem(); // Center when activeIndex changes
  }, [activeIndex]);

  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    const now = Date.now();

    // Prevent scrolling too fast (throttle)
    if (now - lastScrollTime.current < 100) return;
    lastScrollTime.current = now;

    setActiveIndex((prev) =>
      Math.max(0, Math.min(numbers.length - 1, prev + Math.sign(event.deltaY)))
    );
  };

  return (
    <div className="relative w-32 h-40 overflow-hidden border border-gray-500 rounded-lg">
      <div
        className="overflow-y-auto h-full flex flex-col items-center scrollbar-hide"
        onWheel={handleScroll}
        ref={listRef}
      >
        {numbers.map((num, index) => (
          <div
            key={num}
            className={`text-2xl font-bold py-3 transition-all duration-300 ${
              activeIndex === index
                ? "text-white bg-gray-800 rounded-md px-4"
                : "text-gray-500"
            }`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableNumberSelector;
