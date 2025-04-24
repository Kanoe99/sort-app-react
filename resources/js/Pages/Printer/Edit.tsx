import { FormEventHandler, useEffect, useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";

/////////////////////////////////////////////////////////

import IP from "@/Components/IP";
import IPBool from "@/Components/IPBool";
import TextInput from "@/Components/TextInput";
import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import IsLocalDropdown from "@/Components/IsLocalDropdown";
import HasNumberDropdown from "@/Components/HasNumberDropdown";
import DepartmentDropdown from "@/Components/DepartmentDropdown";
import IsNetworkCapableDropdown from "@/Components/IsNetworkCapableDropdown";

import { Printer, PrinterPages } from "@/types";
import { PagesRecordsPanel } from "@/Pages/Printer/PagesRecordsPanel";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PagesRecordsContextProvider } from "@/Pages/Printer/contexts/PagesRecordsContext";

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
      number: number | null;
      location: string;
      status: string;
      fixDate: string;
      IP: string;
      comment: string;
      isIPv4: boolean;
      network_capable: string;
      department_head: string;
      PC_name: string;
      printer_pages_no_sum: PrinterPages[];
    }>({
      PC_name: printer.PC_name,
      department_head: printer.department_head,
      network_capable: printer.network_capable,
      type: printer.type,
      model: printer.model,
      number: printer.number,
      location: printer.location,
      status: printer.status,
      IP: printer.IP,
      comment: printer.comment,
      fixDate: printer.fixDate,
      isIPv4: printer.isIPv4,
      printer_pages_no_sum: printer_pages_no_sum,
    });

  const [hasIP, setHasIP] = useState(printer.IP ? true : false);
  const [isLocal, setIsLocal] = useState(printer.PC_name ? true : false);
  const [isIPv4, setIsIPv4] = useState(printer.isIPv4);
  const [hasNumber, setHasNumber] = useState(printer.number !== null);
  const [IPData, setIPData] = useState({
    IPv4Data: printer.isIPv4 ? printer.IP : "",
    IPv6Data: !printer.isIPv4 ? printer.IP : "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [number, setNumber] = useState(printer.number ?? "");
  const [PC_name, setPC_name] = useState(printer.PC_name ?? "");

  const closeModal = () => {
    setIsModalVisible(false);

    clearErrors();
    reset();
  };

  useEffect(() => {
    setData("IP", isIPv4 ? IPData.IPv4Data : IPData.IPv6Data);
  }, [IPData]);

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

  // const handleIPData = () => {
  //   setIPData(IPData);
  // };

  useEffect(() => {
    hasNumber ? setData("number", number) : setData("number", null);
  }, [hasNumber]);

  useEffect(() => {
    isLocal ? setData("PC_name", PC_name) : setData("PC_name", "");
  }, [isLocal]);

  useEffect(() => {
    hasIP
      ? setData("IP", isIPv4 ? IPData.IPv4Data : IPData.IPv6Data)
      : setData("IP", "");
  }, [hasIP]);

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
        <form
          onSubmit={editPrinter}
          className="flex flex-col gap-4 mb-4 w-[50%] shadow-sm sm:rounded-lg bg-bg-main p-6 text-gray-100"
        >
          <div>
            <InputLabel htmlFor="type" value="Тип оборудования" />

            <TextInput
              id="type"
              placeholder="Принтер"
              className=""
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
              isFocused
              autoComplete="type"
            />

            <InputError className="mt-2" message={errors.type} />
          </div>

          <div>
            <InputLabel htmlFor="model" value="Модель" />

            <TextInput
              id="model"
              placeholder="Samsung 400"
              className=""
              value={data.model}
              onChange={(e) => setData("model", e.target.value)}
              isFocused
              autoComplete="model"
            />

            <InputError className="mt-2" message={errors.model} />
          </div>

          {/* TODO: make 2 items dropdown into generic component */}

          <div>
            <InputLabel htmlFor="hasNumber" value="Есть инвентарный номер?" />

            <HasNumberDropdown
              hasNumber={hasNumber}
              setData={setData}
              id="hasNumber"
              setHasNumber={setHasNumber}
              className="mt-1 block w-full py-3 rounded-xl"
              isFocused
            />
          </div>

          {hasNumber && (
            <div>
              <InputLabel htmlFor="number" value="Номер" />

              <TextInput
                type="number"
                id="number"
                placeholder="5873"
                className=""
                pattern="\d*"
                value={number}
                onChange={(e) => {
                  {
                    const value = parseInt(e.target.value);
                    setNumber(value);
                    setData("number", value);
                  }
                }}
                isFocused
                autoComplete="number"
              />

              <InputError className="mt-2" message={errors.number} />
            </div>
          )}

          <div>
            <InputLabel
              htmlFor="network_capable"
              value="Есть возможность сделать сетевым?"
            />

            <IsNetworkCapableDropdown
              id="network_capable"
              className=""
              isFocused
              network_capable={printer.network_capable}
              autoComplete="network_capable"
              setData={setData}
            />

            <InputError className="mt-2" message={errors.network_capable} />
          </div>

          <div>
            <InputLabel htmlFor="department_head" value="Ответственный" />

            <DepartmentDropdown
              db_head={printer.department_head}
              id="department_head"
              className=""
              department_heads={department_heads}
              isFocused
              autoComplete="department_head"
              setData={setData}
            />

            <InputError className="mt-2" message={errors.department_head} />
          </div>

          <div>
            <InputLabel htmlFor="location" value="Кабинет" />

            <TextInput
              id="location"
              placeholder="318"
              className=""
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              isFocused
              autoComplete="location"
            />

            <InputError className="mt-2" message={errors.location} />
          </div>

          <div>
            <InputLabel htmlFor="isLocal" value="Локальный?" />

            <IsLocalDropdown
              setData={setData}
              id="isLocal"
              isLocal={isLocal}
              setIsLocal={setIsLocal}
              className="mt-1 block w-full py-3 rounded-xl"
              isFocused
            />
          </div>

          {isLocal && (
            <div>
              <InputLabel htmlFor="PC_name" value="Имя компьютера" />

              <TextInput
                id="PC_name"
                placeholder="p66-computer"
                className=""
                value={data.PC_name}
                onChange={(e) => {
                  setPC_name(e.target.value);
                  setData("PC_name", e.target.value);
                }}
                isFocused
                autoComplete="PC_name"
              />

              <InputError className="mt-2" message={errors.PC_name} />
            </div>
          )}

          <div>
            <InputLabel htmlFor="IPBool" value="Есть IP?" />

            <IPBool
              setData={setData}
              id="IPBool"
              className="mt-1 block w-full py-3 rounded-xl"
              isFocused
              autoComplete="IPBool"
              hasIP={hasIP}
              setHasIP={setHasIP}
            />
          </div>

          {hasIP && (
            <div>
              <InputLabel htmlFor="IP" value={`${isIPv4 ? "IPv4" : "IPv6"}`} />
              <IP
                onChange={() => {
                  setData("isIPv4", isIPv4);
                }}
                isIPv4={isIPv4}
                setIsIPv4={setIsIPv4}
                IPData={isIPv4 ? IPData.IPv4Data : IPData.IPv6Data}
                setIPData={setIPData}
              />
              <InputError className="mt-2" message={errors.IP} />
            </div>
          )}

          <div>
            <InputLabel htmlFor="status" value="Статус" />

            <TextInput
              id="status"
              placeholder="В эксплуатации"
              className=""
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              isFocused
              autoComplete="status"
            />

            <InputError className="mt-2" message={errors.status} />
          </div>

          <div>
            <InputLabel htmlFor="comment" value="Комментарий" optional={true} />

            <TextAreaInput
              id="comment"
              className="block w-full"
              value={data.comment}
              onChange={(e) => setData("comment", e.target.value)}
            />

            <InputError className="mt-2" message={errors.comment} />
          </div>

          <div>
            <InputLabel
              htmlFor="fixDate"
              value="Дата последнего ремонта"
              optional={true}
            />

            <DateInput
              id=""
              placeholder="В эксплуатации"
              className=""
              value={data.fixDate}
              onChange={(e) => setData("fixDate", e.target.value)}
              isFocused
              autoComplete="fixDate"
            />

            <InputError className="mt-2" message={errors.fixDate} />
          </div>

          <div className="flex items-center gap-4 justify-center">
            <PrimaryButton
              disabled={processing}
              className="w-[calc(100%_-_0.2rem)] !py-4"
            >
              сохранить
            </PrimaryButton>
          </div>
        </form>
        <PagesRecordsContextProvider
          printer_id={printer.id}
          initialPages={[...printer_pages_no_sum].reverse()}
          setData={setData}
        >
          <PagesRecordsPanel
            hasRecords={printer_pages_no_sum.length > 0}
            printer_id={printer.id}
            sums={sums[0]}
            processing={processing}
            editPrinter={editPrinter}
          />
        </PagesRecordsContextProvider>
      </div>
    </AuthenticatedLayout>
  );
}
