import { FormEventHandler } from "react";
import { Head, router, useForm } from "@inertiajs/react";

/////////////////////////////////////////////////////////

import { Printer, PrinterPages } from "@/types";
import { EditPagesRecordsPanel } from "@/Pages/Printer/EditPagesRecordsPanel";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { EditMainForm } from "@/Pages/Printer/EditMainForm";
import { EditPagesRecordsContextProvider } from "@/Pages/Printer/contexts/EditPagesRecordsContext";

export default function Edit({
  printer,
  sums,
  printer_pages_no_sum,
  department_heads,
}: {
  printer: Printer;
  sums: PrinterPages[];
  printer_pages_no_sum: PrinterPages[];
  department_heads: string[];
}) {
  const { data, setData, processing, errors, put, clearErrors, reset } =
    useForm<{
      type: string;
      model: string;
      hasNumber: boolean;
      number: number | null;
      network_capable: string;
      department_head: string;
      location: string;
      isLocal: boolean;
      PC_name: string;
      IP: string;
      hasIP: boolean;
      isIPv4: boolean;

      status: string;
      fixDate: string;
      comment: string;
      printer_pages_no_sum: PrinterPages[];
    }>({
      type: printer.type,
      model: printer.model,
      hasNumber: printer.number !== null,
      number: printer.number,
      network_capable: printer.network_capable,
      department_head: printer.department_head,
      location: printer.location,
      isLocal: printer.PC_name ? true : false,
      PC_name: printer.PC_name,
      IP: printer.IP,
      hasIP: printer.IP !== null,
      isIPv4: printer.isIPv4,

      status: printer.status,
      comment: printer.comment,
      fixDate: printer.fixDate,
      printer_pages_no_sum: printer_pages_no_sum,
    });

  const editPrinter: FormEventHandler = (ev) => {
    ev.preventDefault();

    put(route("printer.update", { printer: printer.id }), {
      preserveScroll: true,
    });
  };
  const handleDelete: FormEventHandler = (e) => {
    e.preventDefault();
    router.delete(route("printer.destroy", { printer: printer.id }), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl 3xl:ml-[10rem] ml-0 text-nowrap font-semibold leading-tight text-gray-200 flex gap-20">
          <div className="text-sm underline cursor-pointer hover:text-blue-400 select-none">
            <a href={`/printer/${printer.id - 1}/edit`}>предыдущий</a>
          </div>
          <div>
            <span className="inline-block mx-3">{printer.model}</span>{" "}
            {printer.number ? (
              <span className="text-gray-500">№{printer.number}</span>
            ) : (
              <span className="text-red-500 text-sm">
                инвентарный номер отсутствует
              </span>
            )}
          </div>
          <div className="text-sm underline cursor-pointer hover:text-blue-400 select-none">
            <a href={`/printer/${printer.id + 1}/edit`}>следующий</a>
          </div>
        </h2>
      }
    >
      <Head title={`Редактировать ${printer.model}`} />

      <div className="flex 3xl:ml-[20rem] 2xl:ml-[10rem] xl:ml-[5rem] justify-start gap-8">
        <EditMainForm
          data={data}
          editPrinter={editPrinter}
          clearErrors={clearErrors}
          handleDelete={handleDelete}
          reset={reset}
          processing={processing}
          department_heads={department_heads}
          errors={errors}
          setData={setData}
        />

        <EditPagesRecordsContextProvider
          printer_id={printer.id}
          initialPages={[...printer_pages_no_sum].reverse()}
          setData={setData}
        >
          <EditPagesRecordsPanel
            printerAction={editPrinter}
            errors={errors}
            hasRecords={printer_pages_no_sum.length !== 0}
            printer_id={printer.id}
            sums={sums[0]}
            processing={processing}
          />
        </EditPagesRecordsContextProvider>
      </div>
    </AuthenticatedLayout>
  );
}
