import { Tag } from "@/types";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Button = ({
  wrapperClasses,
  arrowClasses,
  onClick,
  isVisible,
}: {
  wrapperClasses: string;
  arrowClasses?: string;
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
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={`text-3xl ${arrowClasses}`}
      />
    </div>
  );
};

const Tags = ({
  tags,
  handleIsSearchMode,
  handleSearchQuery,
  isSearchMode,
  searchQuery,
}: { tags: Tag[] } & {
  searchQuery: string;
  isSearchMode: boolean;
  handleSearchQuery: (query: string) => void;
  handleIsSearchMode: (isSearchMode: boolean) => void;
}) => {
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

    const maxTranslateX = -(ribbonWidth - wrapperWidth + 12);

    setDisplayLeft(true);
    setTranslateX((prevTranslateX) => {
      const newTranslateX = Math.max(
        prevTranslateX - wrapperWidth * 0.5,
        maxTranslateX
      );

      if (newTranslateX === maxTranslateX) {
        setDisplayRight(false);
      }

      return newTranslateX;
    });
  };

  const shiftRight = () => {
    if (!tagRibbonRef.current || !wrapperRef.current) return;

    const minTranslateX = 0;
    const wrapperWidth = wrapperRef.current.clientWidth;

    setDisplayRight(true);
    setTranslateX((prevTranslateX) => {
      const newTranslateX = Math.min(
        prevTranslateX + wrapperWidth * 0.5,
        minTranslateX
      );

      if (newTranslateX === minTranslateX) {
        setDisplayLeft(false);
      }

      return newTranslateX;
    });
  };

  return (
    <div
      className="py-4 bg-black rounded-md flex gap-2 w-full overflow-hidden relative"
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
            onClick={() => {
              if (isSearchMode && searchQuery == tag.name) {
                handleIsSearchMode(false);
              } else {
                handleIsSearchMode(true);
                handleSearchQuery(tag.name);
              }
            }}
            key={tag.id}
            className="block select-none px-2 cursor-pointer text-white bg-neutral-muted hover:bg-neutral-soft rounded-md h-fit text-nowrap font-semibold transition-colors duration-300"
          >
            {tag.name}
          </a>
        ))}
      </div>
      <Button
        isVisible={displayLeft}
        wrapperClasses="bg-gradient-to-r left-0"
        onClick={shiftRight}
      />
      <Button
        isVisible={displayRight}
        wrapperClasses="bg-gradient-to-l justify-end right-0"
        arrowClasses="rotate-[180deg]"
        onClick={shiftLeft}
      />
    </div>
  );
};

export { Tags };
