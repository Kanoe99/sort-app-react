import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="rounded-md border border-1 border-neutral-light w-full text-3xl h-16 bg-black text-[#afafaf] pr-16"
      />
      <div className="w-16 h-16 absolute top-0 right-0 rounded-r-md grid place-items-center cursor-pointer text-neutral-light hover:text-accent-main">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className=" transition duration-100 text-4xl"
        />
      </div>
    </div>
  );
};
export { Search };
