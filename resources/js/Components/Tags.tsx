import { Tag } from "@/types";

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="py-4 bg-black flex gap-2 overflow-hidden relative">
      <div className="px-12 flex gap-2">
        {tags.map((tag) => (
          <a
            key={tag.id}
            className="block px-2 cursor-pointer text-white bg-[#303030] hover:bg-[#454545] rounded-md h-fit text-nowrap font-semibold transition-colors duration-300"
          >
            {tag.name}
          </a>
        ))}
      </div>
      <div className=" w-20 h-full top-0 bg-gradient-to-r from-black from-50% hover:from-60% transition duration-700 to-transparent to-100% absolute text-white px-4 flex items-center cursor-pointer">
        <span className="border-l-4 border-b-4 block w-4 h-4 rotate-45 left-10"></span>
      </div>
      <div className="w-20 h-full top-0 right-0 bg-gradient-to-l from-black from-70% hover:from-80% transition duration-700 to-transparent to-100% absolute text-white px-4 flex items-center cursor-pointer">
        <span className="border-l-4 border-b-4 block w-4 h-4 rotate-[225deg] right-10"></span>
      </div>
    </div>
  );
};
export { Tags };
