import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Printer, PaginatedData } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show({ printer }: { printer: Printer }) {
  const { data, setData, processing, errors, put } = useForm({
    model: printer.model,
    description: printer.description,
  });

  const updateprinter: FormEventHandler = (ev) => {
    ev.preventDefault();

    put(route("printer.update", printer.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-200">
          Редактировать принтер <b>"{printer.model}"</b>
        </h2>
      }
    >
      <Head title={"Редактировать штуку " + printer.model} />

      <div className="mb-4 overflow-hidden shadow-sm sm:rounded-lg bg-[#404040]">
        <div className="p-6 text-gray-100 flex gap-8">
          <form onSubmit={updateprinter} className="w-full">
            <div className="mb-8">
              <InputLabel htmlFor="model" value="Модель" />

              <TextInput
                id="model"
                className="mt-1 block w-full"
                value={data.model}
                onChange={(e) => setData("model", e.target.value)}
                required
                isFocused
                autoComplete="model"
              />

              <InputError className="mt-2" message={errors.model} />
            </div>

            <div className="mb-8">
              <InputLabel htmlFor="description" value="Описание" />

              <TextAreaInput
                id="description"
                rows={6}
                className="mt-1 block w-full"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
