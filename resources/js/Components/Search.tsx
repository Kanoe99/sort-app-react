import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="rounded-md w-full text-3xl h-16 bg-black text-[#afafaf]"
      />
      <div className=" border-0 border-gray-500 w-16 h-16 absolute top-0 right-0 rounded-r-md grid place-items-center cursor-pointer text-gray-500 hover:text-blue-500">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className=" transition duration-100 text-4xl"
        />
      </div>
    </div>
  );
};
export { Search };
