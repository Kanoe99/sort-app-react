import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { PrinterCard } from "./PrinterCard";

const PrintersMain = () => {
  const [printersData, setPrintersData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const itemsPerPage = 2; // Number of items per page

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch(
          `/printers?page=${pagination.current_page}&perPage=${itemsPerPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrintersData(data.printers);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
        });
      } catch (error) {
        console.error("Error fetching printers:", error);
      }
    };

    fetchPrinters();
  }, [pagination.current_page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPagination((prev) => ({ ...prev, current_page: newPage }));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3 px-3 py-2">
        {printersData.map((printer) => (
          <PrinterCard key={printer.id} printer={printer} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between py-4 px-3 w-full">
        {/* Previous Button */}
        {pagination.current_page > 1 && (
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md select-none"
          >
            Назад
          </button>
        )}

        {/* Page Info */}
        <div className="text-white flex items-center justify-center select-none">
          <span>{`Страница ${pagination.current_page} из ${pagination.last_page}`}</span>
        </div>

        {/* Next Button */}

        <button
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => handlePageChange(pagination.current_page + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md select-none"
        >
          Вперёд
        </button>
      </div>
    </div>
  );
};

export { PrintersMain };
