import { useState, useEffect } from "react";
import { PrinterCard } from "./PrinterCard";
import { Pagination } from "../../../Components/Pagination";
import { Printer } from "@/types";
import { NotFound } from "../../../Components/NotFound";
import { PrinterCardContextProvider } from "../contexts/PrinterCardContext";

const PrintersMain = ({
  isSearchMode,
  searchQuery,
}: {
  isSearchMode: boolean;
  searchQuery: string;
}) => {
  const [printersData, setPrintersData] = useState<Printer[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [searchTransliterated, setSearchTransliterated] = useState("");

  const itemsPerPage = 12;

  useEffect(
    () => setPagination((prev) => ({ ...prev, current_page: 1 })),
    [searchQuery]
  );

  useEffect(() => {
    const fetchData = async () => {
      const endPoint = isSearchMode ? "search" : "printers";
      const search = isSearchMode ? `&search=${searchQuery}` : "";

      try {
        const response = await fetch(
          `/${endPoint}?page=${pagination.current_page}&perPage=${itemsPerPage}${search}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchTransliterated(data.searchTransliterated);
        setPrintersData(data.printers);
        setPagination((prev) => ({ ...prev, last_page: data.last_page }));
      } catch (error) {
        console.error("Error fetching printers:", error);
      }
    };

    fetchData();
  }, [pagination.current_page, isSearchMode, searchQuery]);

  return (
    <div className="flex flex-col relative">
      {printersData.length !== 0 ? (
        isSearchMode && (
          <div className="font-semibold text-xl border-l-2 flex items-center pl-4 mb-6 h-10">
            Показаны результаты по запросу "{searchTransliterated}"
          </div>
        )
      ) : (
        <NotFound message={`Нет данных по запросу ${searchQuery}`} />
      )}
      <PrinterCardContextProvider>
        <div
          className="grid grid-cols-3 grid-rows-4 gap-3 py-2 items-start min-h-screen"
          style={{
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none", // Firefox
          }}
        >
          {printersData.length !== 0 &&
            printersData.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
        </div>
        <div className="sticky flex-1 bottom-0 backdrop-blur-xl w-full">
          {printersData.length !== 0 && pagination.last_page > 1 && (
            <Pagination pagination={pagination} setPagination={setPagination} />
          )}
        </div>
      </PrinterCardContextProvider>
    </div>
  );
};

export { PrintersMain };
