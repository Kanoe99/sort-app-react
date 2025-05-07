import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

///////////////////////////////////////////////////////////////

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { CreateMainForm } from "@/Pages/Printer/CreateMainForm";
import { CreatePagesRecordsPanel } from "@/Pages/Printer/CreatePagesRecordsPanel";
import { EditPagesRecordsContextProvider } from "@/Pages/Printer/contexts/EditPagesRecordsContext";
import { PrinterPages } from "@/types";

export default function Show({
  department_heads,
  id,
}: {
  id: number;
  department_heads: string[];
}) {
  const { data, setData, processing, errors, post, clearErrors, reset } =
    useForm<{
      type: string;
      model: string;
      counter: undefined | number;
      number: undefined | number;
      location: string;
      status: string;
      fixDate: string;
      IPBool: string;
      IP: string;
      comment: string;
      isIPv4: boolean;
      isLocal: boolean;
      department_head: string;
      PC_name: string;
      network_capable: string;
      hasNumber: boolean;
      hasIP: boolean;
      printer_pages_no_sum: PrinterPages[];
    }>({
      printer_pages_no_sum: [],
      hasNumber: true,
      network_capable: "Нет возможности",
      PC_name: "",
      department_head: department_heads[0],
      isLocal: true,
      type: "",
      model: "",
      counter: undefined,
      number: undefined,
      location: "",
      status: "",
      fixDate: "",
      IPBool: "Есть",
      IP: "",
      comment: "",
      isIPv4: true,
      hasIP: false,
    });

  const createPrinter: FormEventHandler = (ev) => {
    ev.preventDefault();

    post(route("printer.store"), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl mx-auto w-[40%] font-semibold leading-tight text-gray-200">
          Новый
        </h2>
      }
    >
      <Head title="Новый" />

      <div className="flex 3xl:ml-[20rem] 2xl:ml-[10rem] xl:ml-[5rem] justify-start gap-8">
        <CreateMainForm
          data={data}
          createPrinter={createPrinter}
          clearErrors={clearErrors}
          reset={reset}
          processing={processing}
          department_heads={department_heads}
          errors={errors}
          setData={setData}
        />
        <EditPagesRecordsContextProvider
          printer_id={id}
          setData={setData}
          initialPages={[]}
        >
          <CreatePagesRecordsPanel
            errors={errors}
            printer_id={id}
            processing={processing}
          />
        </EditPagesRecordsContextProvider>
      </div>
    </AuthenticatedLayout>
  );
}
