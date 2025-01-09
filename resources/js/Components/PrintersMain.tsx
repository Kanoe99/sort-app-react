import { useState, useEffect } from "react";
import { PrinterCard } from "./PrinterCard";
import { Pagination } from "./Pagination";
import { Printer } from "@/types";

const PrintersMain = () => {
  const [printersData, setPrintersData] = useState<Printer[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const itemsPerPage = 12;

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

  return (
    <div className="flex flex-col relative">
      <div
        className="grid grid-cols-3 grid-rows-4 gap-3 py-2 items-start min-h-screen"
        style={{
          msOverflowStyle: "none", // IE and Edge
          scrollbarWidth: "none", // Firefox
        }}
      >
        {printersData.map((printer) => (
          <PrinterCard key={printer.id} printer={printer} />
        ))}
      </div>
      <div className="sticky flex-1 bottom-0 backdrop-blur-xl w-full">
        <Pagination pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
};

export { PrintersMain };
