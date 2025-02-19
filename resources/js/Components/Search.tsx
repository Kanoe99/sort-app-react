import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps {
  handleIsSearchMode: (isSearchMode: boolean) => void;
  handleSearchQuery: (query: string) => void;
}

const Search = ({ handleIsSearchMode, handleSearchQuery }: SearchProps) => {
  return (
    <div className="relative">
      <input
        onKeyDown={(e) => {
          if (e.key == "Enter" || e.key == "NumpadEnter") {
            handleIsSearchMode(true);
          }
        }}
        //search mode is not being disabled after enter and causes 10000000 requests in onchange
        onChange={(e) => {
          handleSearchQuery(e.target.value);
          if (!e.target.value) {
            handleIsSearchMode(false);
          }
        }}
        type="text"
        className="rounded-md border border-1 border-neutral-light w-full text-3xl h-16 bg-black text-[#afafaf] pr-16"
      />
      <div className="w-16 h-16 absolute top-0 right-0 rounded-r-md grid place-items-center cursor-pointer text-neutral-light hover:text-accent-main">
        <FontAwesomeIcon
          onClick={() => handleIsSearchMode(true)}
          icon={faMagnifyingGlass}
          className=" transition duration-100 text-4xl"
        />
      </div>
    </div>
  );
};
export { Search };
