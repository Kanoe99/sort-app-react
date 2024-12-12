import { useState } from "react";
import { Tag } from "@/types";

const Button = ({
  wrapperClasses,
  arrowClasses,
  onClick,
}: {
  wrapperClasses: string;
  arrowClasses: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-16 h-full from-black from-70% hover:from-80% transition duration-700 to-transparent to-100% top-0 absolute text-white px-4 flex items-center cursor-pointer ${wrapperClasses}`}
      onClick={onClick}
    >
      <span
        className={`border-l-4 border-b-4 block w-4 h-4 ${arrowClasses}`}
      ></span>
    </div>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  const [tagsList, setTagsList] = useState(tags);

  const shiftRight = () => {
    const updatedTags = [...tagsList];
    const firstTag = updatedTags.shift();
    if (firstTag) {
      updatedTags.push(firstTag);
    }
    setTagsList(updatedTags);
  };

  const shiftLeft = () => {
    const updatedTags = [...tagsList];
    const lastTag = updatedTags.pop();
    if (lastTag) {
      updatedTags.unshift(lastTag);
    }
    setTagsList(updatedTags);
  };

  return (
    <div className="py-4 bg-black flex gap-2 overflow-hidden relative">
      <div className="px-12 flex gap-2 transition-all duration-300">
        {tagsList.map((tag) => (
          <a
            key={tag.id}
            className="block px-2 cursor-pointer text-white bg-[#303030] hover:bg-[#454545] rounded-md h-fit text-nowrap font-semibold transition-colors duration-300"
          >
            {tag.name}
          </a>
        ))}
      </div>
      <Button
        wrapperClasses="bg-gradient-to-r left-0"
        arrowClasses="rotate-45"
        onClick={shiftRight}
      />
      <Button
        wrapperClasses="bg-gradient-to-l justify-end right-0"
        arrowClasses="rotate-[225deg]"
        onClick={shiftLeft}
      />
    </div>
  );
};

export { Tags };
