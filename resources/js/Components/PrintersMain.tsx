import { useState, useEffect } from "react";
import { Printer } from "@/types";
import { Link } from "@inertiajs/react"; // Inertia.js Link for navigation

const PrinterCard = ({ printer }: { printer: Printer }) => {
  return (
    <div
      className="bg-[#252525] flex flex-col gap-2 text-white rounded-md px-5 py-3 w-full h-full"
      style={{ outlineWidth: "1px" }}
    >
      <div>
        <div className="bg-black px-4 outline outline-1 rounded-md w-full flex justify-between">
          <div className="flex-1 border-r h-full py-2">{printer.model}</div>
          <div className="pl-4 py-2">{printer.number}</div>
        </div>
        <div className="text-sm font-bold mb-2 mt-1 px-4">{printer.type}</div>
      </div>
      <div>
        <div className="bg-black px-4 py-2 rounded-md flex justify-between">
          <div className="font-black text-blue-500">{printer.counter}</div>
          <div className="text-blue-200">{printer.counterDate}</div>
        </div>
        <div className="px-4">
          Дата последнего ремонта:{" "}
          <span className="text-yellow-500">{printer.fixDate}</span>
        </div>
      </div>
      <div className="bg-black px-4 py-1 rounded-md flex-1">
        <span className="mr-10 font-bold bg-[#303030] px-4 rounded-md inline-block py-1">
          {printer.status}
        </span>
        <span>{printer.comment}</span>
      </div>
    </div>
  );
};

const PrintersMain = ({ printers }: { printers: any }) => {
  const [printersData, setPrintersData] = useState(printers?.data || []);
  const [pagination, setPagination] = useState(printers || {});

  useEffect(() => {
    if (printers?.data) {
      setPrintersData(printers.data);
      setPagination(printers);
    }
  }, [printers]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3 px-3 py-2">
        {printersData.map((printer: Printer) => (
          <PrinterCard key={printer.id} printer={printer} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between py-4 px-3 w-full">
        {/* Previous Button */}
        {pagination.prev_page_url && (
          <Link
            href={pagination.prev_page_url}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Назад
          </Link>
        )}

        {/* Page Info */}
        <div className="text-white flex items-center justify-center">
          <span>{`Страница ${pagination.current_page} из ${pagination.last_page}`}</span>
        </div>

        {/* Next Button */}
        {pagination.next_page_url && (
          <Link
            href={pagination.next_page_url}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Вперёд
          </Link>
        )}
      </div>
    </div>
  );
};

export { PrintersMain };
