import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

///////////////////////////////////////////////////////////////

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { CreateMainForm } from "@/Pages/Printer/CreateMainForm";
import { CreatePagesRecordsPanel } from "@/Pages/Printer/CreatePagesRecordsPanel";
import { CreatePagesRecordsContextProvider } from "@/Pages/Printer/contexts/CreatePagesRecordsContext";

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
    }>({
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
    });

  const [hasIP, setHasIP] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [isLocal, setIsLocal] = useState(true);

  //TODO: make into 1
  const [isIPv4, setIsIPv4] = useState(true);
  const [IPData, setIPData] = useState({ IPv4Data: "", IPv6Data: "" });

  useEffect(() => {
    data.IPBool === "Есть" ? setHasIP(true) : setHasIP(false);
  }, [data.IPBool]);

  useEffect(() => {
    setData("IP", isIPv4 ? IPData.IPv4Data : IPData.IPv6Data);
  }, [IPData]);

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
          Новый принтер
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
        <CreatePagesRecordsContextProvider printer_id={id} setData={setData}>
          <CreatePagesRecordsPanel
            errors={errors}
            printer_id={id}
            processing={processing}
          />
        </CreatePagesRecordsContextProvider>
      </div>
    </AuthenticatedLayout>
  );
}
