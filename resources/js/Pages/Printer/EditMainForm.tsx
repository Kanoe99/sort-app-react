import { useState, useEffect } from "react";

/////////////////////////////////////////////////

import { EditMainFormProps } from "@/Pages/Printer/utils/interfaces";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import HasNumberDropdown from "@/Components/HasNumberDropdown";
import IsNetworkCapableDropdown from "@/Components/IsNetworkCapableDropdown";
import DepartmentDropdown from "@/Components/DepartmentDropdown";
import IsLocalDropdown from "@/Components/IsLocalDropdown";
import IPBool from "@/Components/IPBool";
import IP from "@/Components/IP";
import TextAreaInput from "@/Components/TextAreaInput";
import DateInput from "@/Components/DateInput";
import PrimaryButton from "@/Components/PrimaryButton";

const EditMainForm = ({
  editPrinter,
  printer,
  clearErrors,
  reset,
  processing,
  department_heads,
  errors,
  setData,
}: EditMainFormProps) => {
  const [hasIP, setHasIP] = useState(printer.IP !== null);
  const [isLocal, setIsLocal] = useState(printer.PC_name !== null);
  const [isIPv4, setIsIPv4] = useState(printer.isIPv4);
  const [hasNumber, setHasNumber] = useState(printer.number !== null);
  const [IPData, setIPData] = useState({
    IPv4Data: printer.isIPv4 ? printer.IP : "",
    IPv6Data: !printer.isIPv4 ? printer.IP : "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [number, setNumber] = useState(printer.number ?? "");
  const [PC_name, setPC_name] = useState(printer.PC_name ?? "");

  const closeModal = ({
    clearErrors,
    reset,
  }: {
    clearErrors: () => void;
    reset: () => void;
  }) => {
    setIsModalVisible(false);

    clearErrors();
    reset();
  };
  useEffect(() => {
    setData("IP", isIPv4 ? IPData.IPv4Data : IPData.IPv6Data);
  }, [IPData]);

  useEffect(() => {
    hasNumber ? setData("number", number) : setData("number", null);
  }, [hasNumber]);

  useEffect(() => {
    isLocal ? setData("PC_name", PC_name) : setData("PC_name", "");
  }, [isLocal]);

  useEffect(() => {
    hasIP
      ? //goes into IP.tsx
        setData("IP", isIPv4 ? IPData.IPv4Data : IPData.IPv6Data)
      : //goes into IPBool.tsx
        setData("IP", "");
  }, [hasIP]);

  return (
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
          value={printer.type}
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
          value={printer.model}
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
          setHasNumber={setHasNumber}
          setData={setData}
          id="hasNumber"
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
          value={printer.location}
          onChange={(e) => setData("location", e.target.value)}
          isFocused
          autoComplete="location"
        />

        <InputError className="mt-2" message={errors.location} />
      </div>

      <div>
        <InputLabel htmlFor="isLocal" value="Локальный?" />

        <IsLocalDropdown
          isLocal={isLocal}
          setIsLocal={setIsLocal}
          setData={setData}
          id="isLocal"
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
            value={printer.PC_name}
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
        <InputLabel htmlFor="hasIP" value="Есть IP?" />

        <IPBool
          hasIP={hasIP}
          setHasIP={setHasIP}
          setData={setData}
          id="hasIP"
          className="mt-1 block w-full py-3 rounded-xl"
          isFocused
          autoComplete="hasIP"
        />
      </div>

      {hasIP && (
        <div>
          <InputLabel htmlFor="IP" value={`${isIPv4 ? "IPv4" : "IPv6"}`} />
          <IP
            isIPv4={isIPv4}
            setIsIPv4={setIsIPv4}
            onChange={() => {
              setData("isIPv4", isIPv4);
            }}
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
          value={status}
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
          value={printer.comment}
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
          value={printer.fixDate}
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
  );
};

export { EditMainForm };
