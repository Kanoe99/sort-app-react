import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
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
import { Printer } from "@/types";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import IsNetworkCapableDropdown from "@/Components/IsNetworkCapableDropdown";
import DepartmentDropdown from "@/Components/DepartmentDropdown";
import IsLocalDropdown from "@/Components/IsLocalDropdown";

export default function Edit({
  printer,
  department_heads,
}: {
  printer: Printer;
  department_heads: string[];
}) {
  const { data, setData, processing, errors, put, clearErrors, reset } =
    useForm<{
      type: string;
      model: string;
      counter: string;
      number: undefined | number;
      location: string;
      status: string;
      fixDate: string;
      IPBool: string;
      IP: string;
      comment: string;
      isIPv4: boolean;
      network_capable: string;
      department_head: string;
      PC_name: string;
      isLocal: boolean;
    }>({
      isLocal: printer.isLocal,
      PC_name: printer.PC_name,
      department_head: printer.department_head,
      network_capable: printer.network_capable,
      type: printer.type,
      model: printer.model,
      counter: printer.counter,
      number: printer.number,
      location: printer.location,
      status: printer.status,
      IPBool: printer.IP !== null ? "Есть" : "Нету",
      IP: printer.IP,
      comment: printer.comment,
      fixDate: printer.fixDate,
      isIPv4: printer.isIPv4,
    });

  const [hasIP, setHasIP] = useState(printer.IP ? true : false);
  const [isLocal, setIsLocal] = useState(printer.isLocal);
  const [isIPv4, setIsIPv4] = useState(printer.isIPv4);
  const [IPData, setIPData] = useState({
    IPv4Data: printer.isIPv4 ? printer.IP : "",
    IPv6Data: !printer.isIPv4 ? printer.IP : "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const now = new Date().toLocaleDateString();

  console.log(printer);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl mx-auto w-[40%] font-semibold leading-tight text-gray-200">
          Редактировать {printer.type} {printer.number}
        </h2>
      }
    >
      <Head title={`Редактировать ${printer.model}`} />

      <div className="flex mx-auto justify-center gap-8">
        <div className=" mb-4 shadow-sm sm:rounded-lg bg-bg-main w-[40%]">
          <div className="p-6 text-gray-100 flex gap-8">
            <form onSubmit={editPrinter} className="w-full flex flex-col gap-4">
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

                <TextInput
                  type="number"
                  id="number"
                  placeholder="5873"
                  className=""
                  pattern="\d*"
                  value={data.number}
                  onChange={(e) => {
                    {
                      const value = parseInt(e.target.value);
                      setData("number", value);
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
                  value={data.network_capable}
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

                <InputError className="mt-2" message={errors.isLocal} />
              </div>

              {/* {isLocal && (
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
                )} */}

              <div>
                <InputLabel htmlFor="IPBool" value="Есть IP?" />

                <IPBool
                  setHasIP={setHasIP}
                  setData={setData}
                  hasIP={hasIP}
                  id="IPBool"
                  className="mt-1 block w-full py-3 rounded-xl"
                  isFocused
                  autoComplete="IPBool"
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
                  value={data.comment ?? ""}
                  onChange={(e) => setData("comment", e.target.value)}
                />

                <InputError className="mt-2" message={errors.comment} />
              </div>

              <div>
                <InputLabel htmlFor="counter" value="Счётчик страниц" />
                <TextInput
                  type="number"
                  id="counter"
                  placeholder="1234"
                  className=""
                  value={data.counter}
                  onChange={(e) => setData("counter", e.target.value)}
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
                  value={data.fixDate ?? ""}
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
                <DangerButton
                  onClick={() => setIsModalVisible(true)}
                  disabled={processing}
                  className="w-[calc(30%_-_0.2rem)] !py-4"
                >
                  удалить
                </DangerButton>
                <Modal show={isModalVisible} onClose={closeModal}>
                  <section className="p-6">
                    <h2 className="text-lg font-medium text-gray-100">
                      Вы уверены?
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Вы удалите {printer.model} №{printer.number} (
                      {printer.type})
                    </p>
                    <div className="flex justify-end gap-4 mt-6">
                      <SecondaryButton onClick={closeModal}>
                        Отмена
                      </SecondaryButton>
                      <DangerButton
                        onClick={handleDelete}
                        disabled={processing}
                        className="w-[calc(30%_-_0.2rem)] !py-4"
                      >
                        удалить
                      </DangerButton>
                    </div>
                  </section>
                </Modal>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-between p-6 shadow-sm sm:rounded-lg bg-bg-main">
            <div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <div className="px-4 font-bold text-gray-300">напечатано</div>
                  <TextInput
                    type="number"
                    id="number"
                    placeholder="5873"
                    className=""
                    pattern="\d*"
                    value={data.number}
                    onChange={(e) => {
                      {
                        const value = parseInt(e.target.value);
                        setData("number", value);
                      }
                    }}
                    isFocused
                    autoComplete="number"
                  />
                </div>
                <div className="w-1/2">
                  <div className="px-4 font-bold text-gray-300">
                    отсканировано
                  </div>
                  <TextInput
                    type="number"
                    id="number"
                    placeholder="5873"
                    className=""
                    pattern="\d*"
                    value={data.number}
                    onChange={(e) => {
                      {
                        const value = parseInt(e.target.value);
                        setData("number", value);
                      }
                    }}
                    isFocused
                    autoComplete="number"
                  />
                </div>
              </div>
              <hr className="my-5" />
              <div className="overflow-x-hidden h-fit flex flex-col gap-2 max-h-[35rem] custom-scrollbar scroll-padding overflow-y-auto scrollbar-thin pr-3">
                {Array.from({ length: 2 }, (_, i) => i + 1).map(
                  (element, index) => (
                    <div
                      key={element + "list"}
                      className="flex gap-2 h-fit max-h-[40rem] px-2 py-1 rounded-md bg-white/5 border-[1px] border-black"
                    >
                      <div>
                        <TextInput
                          type="number"
                          id="number"
                          placeholder="5873"
                          className=""
                          pattern="\d*"
                          value={data.number}
                          onChange={(e) => {
                            {
                              const value = parseInt(e.target.value);
                              setData("number", value);
                            }
                          }}
                          isFocused
                          autoComplete="number"
                        />
                        <div className="text-xs px-4 mt-1">
                          с <span className="text-blue-300">{now}</span> по{" "}
                          <span className="text-blue-300">{now}</span>
                        </div>
                      </div>
                      <div>
                        <TextInput
                          type="number"
                          id="number"
                          placeholder="5873"
                          className=""
                          pattern="\d*"
                          value={data.number}
                          onChange={(e) => {
                            {
                              const value = parseInt(e.target.value);
                              setData("number", value);
                            }
                          }}
                          isFocused
                          autoComplete="number"
                        />
                        {/* <div className="text-xs px-4 mt-1">
                        с <span className="text-blue-300">{now}</span> по{" "}
                        <span className="text-blue-300">{now}</span>
                      </div> */}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <PrimaryButton
            onClick={(e) => editPrinter(e)}
            disabled={processing}
            className="w-[calc(100%)] !py-4 mt-2"
          >
            сохранить
          </PrimaryButton>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
