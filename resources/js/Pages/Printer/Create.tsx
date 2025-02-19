import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import DateInput from "@/Components/DateInput";
import IPBool from "@/Components/IPBool";
import { useState } from "react";
import IP from "@/Components/IP";
import TextAreaInput from "@/Components/TextAreaInput";
import DepartmentDropdown from "@/Components/DepartmentDropdown";
import IsLocalDropdown from "@/Components/isLocalDropdown";
import IsNetworkCapableDropdown from "@/Components/isNetworkCapableDropdown";
import NumberInput from "@/Components/NumberInput";

export default function Show({
  department_heads,
}: {
  department_heads: string[];
}) {
  const { data, setData, processing, errors, post } = useForm<{
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
  }>({
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

      <div className="">
        <div className="mx-auto mb-4 shadow-sm sm:rounded-lg bg-bg-main w-[40%]">
          <div className="p-6 text-gray-100 flex gap-8">
            <form
              onSubmit={createPrinter}
              className="w-full flex flex-col gap-4"
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

              <div>
                <InputLabel htmlFor="number" value="Номер" />

                <NumberInput
                  id="number"
                  placeholder="5873"
                  className=""
                  value={data.number || ""} // Render an empty string if data.number is undefined
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setData("number", value);
                    } else {
                      setData("number", undefined); // Set to undefined if input is invalid
                    }
                  }}
                  isFocused
                  autoComplete="number"
                />

                <InputError className="mt-2" message={errors.number} />
              </div>

              <div>
                <InputLabel
                  htmlFor="network_capable"
                  value="Есть возможность сделать сетевым?"
                />

                <IsNetworkCapableDropdown
                  id="network_capable"
                  className=""
                  isFocused
                  autoComplete="network_capable"
                  setData={setData}
                />

                <InputError className="mt-2" message={errors.network_capable} />
              </div>

              <div>
                <InputLabel htmlFor="department_head" value="Ответственный" />

                <DepartmentDropdown
                  db_head={null}
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

                <InputError className="mt-2" message={errors.isLocal} />
              </div>

              {isLocal && (
                <div>
                  <InputLabel htmlFor="PC_name" value="Имя компьютера" />

                  <TextInput
                    id="PC_name"
                    placeholder="p66-computer"
                    className=""
                    value={data.PC_name}
                    onChange={(e) => setData("PC_name", e.target.value)}
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

                <InputError className="mt-2" message={errors.IPBool} />
              </div>

              {hasIP && (
                <div>
                  <InputLabel
                    htmlFor="IP"
                    value={`${isIPv4 ? "IPv4" : "IPv6"}`}
                  />
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
                <InputLabel
                  htmlFor="comment"
                  value="Комментарий"
                  optional={true}
                />

                <TextAreaInput
                  id="comment"
                  className="block w-full"
                  value={data.comment}
                  onChange={(e) => setData("comment", e.target.value)}
                />

                <InputError className="mt-2" message={errors.comment} />
              </div>

              <div>
                <InputLabel htmlFor="counter" value="Счётчик страниц" />
                <NumberInput
                  id="counter"
                  placeholder="1234"
                  className=""
                  value={data.counter || ""}
                  onChange={(e) => {
                    {
                      const value = parseInt(e.target.value);
                      if (isNaN(value)) {
                        setData("counter", undefined);
                      } else {
                        setData("counter", value);
                      }
                    }
                  }}
                  isFocused
                  autoComplete="counter"
                />
                <InputError className="mt-2" message={errors.counter} />
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
