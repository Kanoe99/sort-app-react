import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  setPagination: (prev: any) => void;
  pagination: { current_page: number; last_page: number };
}

const Button = ({
  onClick,
  arrowStyle,
}: {
  onClick: () => void;
  arrowStyle?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 text-white rounded-md select-none grid place-items-center text-xl hover:bg-neutral-transparent-button"
    >
      <FontAwesomeIcon icon={faAngleLeft} className={arrowStyle} />
    </button>
  );
};

const Pagination = ({ setPagination, pagination }: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination((prev: any) => ({ ...prev, current_page: newPage }));
    }
  };

  const handlePrevious = () => {
    const page =
      pagination.current_page === 1
        ? pagination.last_page
        : pagination.current_page - 1;
    handlePageChange(page);
  };

  const handleNext = () => {
    const page =
      pagination.current_page === pagination.last_page
        ? 1
        : pagination.current_page + 1;
    handlePageChange(page);
  };
  const generatePages = () => {
    const { current_page, last_page } = pagination;
    const pages: (number | string)[] = [];

    // Always include the first page
    pages.push(1);

    if (current_page === 1) {
      // First page case: Only show the right adjacent page
      if (last_page > 2) {
        pages.push(2);
        if (last_page > 3) pages.push("...");
      }
    } else if (current_page === last_page) {
      // Last page case: Only show the left adjacent page
      if (last_page > 2) {
        if (last_page > 3) pages.push("...");
        pages.push(last_page - 1);
      }
    } else {
      // Middle pages case: Show left and right adjacent pages
      if (current_page > 2) pages.push("..."); // Show "..." before if not 2nd page
      if (current_page !== 2) pages.push(current_page - 1); // Exclude left page when on the 2nd page
      pages.push(current_page);
      if (current_page !== last_page) pages.push(current_page + 1); // Exclude right page when on the last page
      if (current_page < last_page - 1) pages.push("...");
    }

    // Always include the last page if it's not already added
    if (last_page > 1 && pages[pages.length - 1] !== last_page) {
      pages.push(last_page);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-between w-full relative py-1 px-1">
      <Button onClick={handlePrevious} />

      <div className="text-white flex items-center justify-center select-none w-full space-x-2">
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <span
              key={index}
              onClick={() => handlePageChange(page)}
              className={`text-md w-10 h-10 rounded-md cursor-pointer grid place-items-center hover:bg-neutral-transparent-button ${
                page === pagination.current_page
                  ? "!bg-neutral-soft text-white"
                  : ""
              }`}
            >
              {page}
            </span>
          ) : (
            <span
              key={index}
              className="text-2xl w-14 h-14 grid place-items-center"
            >
              {page}
            </span>
          )
        )}
      </div>

      <Button onClick={handleNext} arrowStyle="rotate-180" />
    </div>
  );
};

export { Pagination };
