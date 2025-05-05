import { useState } from "react";

//////////////////////////////////////////////

import DateInput from "@/Components/DateInput";
import DepartmentDropdown from "@/Components/DepartmentDropdown";
import HasNumberDropdown from "@/Components/HasNumberDropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import IP from "@/Components/IP";
import IPBool from "@/Components/IPBool";
import IsLocalDropdown from "@/Components/IsLocalDropdown";
import IsNetworkCapableDropdown from "@/Components/IsNetworkCapableDropdown";
import NumberInput from "@/Components/NumberInput";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { CreateMainFormProps } from "@/Pages/Printer/utils/interfaces";

const CreateMainForm = ({
  createPrinter,
  clearErrors,
  reset,
  processing,
  type,
  model,
  department_heads,
  location,
  errors,
  data_PC_name,
  status,
  fixDate,
  setData,
  comment,
}: CreateMainFormProps) => {
  const [hasIP, setHasIP] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [number, setNumber] = useState("");
  const [isLocal, setIsLocal] = useState(true);

  //TODO: make into 1
  const [isIPv4, setIsIPv4] = useState(true);
  const [IPData, setIPData] = useState({ IPv4Data: "", IPv6Data: "" });

  return (
    <form
      onSubmit={createPrinter}
      className="flex flex-col gap-4 mb-4 w-[50%] shadow-sm sm:rounded-lg bg-bg-main p-6 text-gray-100"
    >
      <div>
        <InputLabel htmlFor="type" value="Тип оборудования" />

        <TextInput
          id="type"
          placeholder="Принтер"
          className=""
          value={type}
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
          value={model}
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

          <NumberInput
            id="number"
            placeholder="5873"
            className=""
            value={number || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                setData("number", value);
              } else {
                setData("number", null);
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
          value={location}
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
            value={PC_name}
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
  );
};

export { CreateMainForm };
