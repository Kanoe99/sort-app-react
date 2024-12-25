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
  const itemsPerPage = 10;

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
      <div className="grid grid-cols-2 gap-3 py-2 mb-10">
        {printersData.map((printer) => (
          <PrinterCard key={printer.id} printer={printer} />
        ))}
      </div>
      <div className="fixed flex-1 bottom-0 backdrop-blur-xl w-[calc(60vw_-_0.75rem)]">
        <Pagination pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
};

export { PrintersMain };
