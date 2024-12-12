import { Tag } from "@/types";
import { useRef, useEffect, useState } from "react";

const Button = ({
  wrapperClasses,
  arrowClasses,
  onClick,
  isVisible,
}: {
  wrapperClasses: string;
  arrowClasses: string;
  onClick: () => void;
  isVisible: boolean;
}) => {
  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } w-16 h-full from-black from-70% hover:from-80% transition duration-700 to-transparent to-100% top-0 absolute text-white px-4 flex items-center cursor-pointer ${wrapperClasses}`}
      onClick={onClick}
    >
      <span
        className={`border-l-4 border-b-4 block w-4 h-4 ${arrowClasses}`}
      ></span>
    </div>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  const tagRibbonRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [displayRight, setDisplayRight] = useState<boolean>(false);
  const [displayLeft, setDisplayLeft] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const tagRibbon = tagRibbonRef.current;

    if (wrapper && tagRibbon) {
      setDisplayRight(wrapper.clientWidth < tagRibbon.clientWidth);
    }
  }, [tags]);
  const shiftLeft = () => {
    if (!tagRibbonRef.current || !wrapperRef.current) return;

    const wrapperWidth = wrapperRef.current.clientWidth;
    const ribbonWidth = tagRibbonRef.current.clientWidth;

    const maxTranslateX = -(ribbonWidth - wrapperWidth + 55);

    setDisplayLeft(true);
    setTranslateX((prevTranslateX) => {
      const newTranslateX = Math.max(prevTranslateX - 200, maxTranslateX);

      if (newTranslateX === maxTranslateX) {
        setDisplayRight(false);
      }

      return newTranslateX;
    });
  };

  const shiftRight = () => {
    if (!tagRibbonRef.current || !wrapperRef.current) return;

    const minTranslateX = 0;

    setDisplayRight(true);
    setTranslateX((prevTranslateX) => {
      const newTranslateX = Math.min(prevTranslateX + 200, minTranslateX);

      if (newTranslateX === minTranslateX) {
        setDisplayLeft(false);
      }

      console.log(tags);

      return newTranslateX;
    });
  };

  return (
    <div
      className="py-4 bg-black flex gap-2 overflow-hidden relative"
      id="wrapper"
      ref={wrapperRef}
    >
      <div
        className="px-0 flex gap-2 transition-all duration-300"
        ref={tagRibbonRef}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {tags.map((tag) => (
          <a
            key={tag.id}
            className="block px-2 cursor-pointer text-white bg-[#303030] hover:bg-[#454545] rounded-md h-fit text-nowrap font-semibold transition-colors duration-300"
          >
            {tag.name}
          </a>
        ))}
      </div>
      <Button
        isVisible={displayLeft}
        wrapperClasses="bg-gradient-to-r left-0"
        arrowClasses="rotate-45"
        onClick={shiftRight}
      />
      <Button
        isVisible={displayRight}
        wrapperClasses="bg-gradient-to-l justify-end right-0"
        arrowClasses="rotate-[225deg]"
        onClick={shiftLeft}
      />
    </div>
  );
};

export { Tags };
