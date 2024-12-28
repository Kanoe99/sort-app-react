import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
// import { Feature, PaginatedData } from "@/types";
// import FeatureItem from "@/Components/FeatureItem";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
// import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show() {
  const { data, setData, processing, errors, post } = useForm({
    type: "",
    model: "",
    counter: "",
    number: undefined,
    location: "",
    status: "",
  });

  const createFeature: FormEventHandler = (ev) => {
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
      <Head title="Новая штука" />

      <div className="">
        <div className="mx-auto mb-4 overflow-hidden shadow-sm sm:rounded-lg bg-bg-main w-[40%]">
          <div className="p-6 text-gray-100 flex gap-8">
            <form
              onSubmit={createFeature}
              className="w-full flex flex-col gap-4"
            >
              <div>
                <InputLabel htmlFor="type" value="Тип оборудования" />

                <TextInput
                  id="type"
                  placeholder="Принтер"
                  className="mt-1 block w-full py-3 rounded-xl"
                  value={data.type}
                  onChange={(e) => setData("type", e.target.value)}
                  required
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
                  className="mt-1 block w-full py-3 rounded-xl"
                  value={data.model}
                  onChange={(e) => setData("model", e.target.value)}
                  required
                  isFocused
                  autoComplete="model"
                />

                <InputError className="mt-2" message={errors.model} />
              </div>
              <div>
                <InputLabel htmlFor="counter" value="Счётчик страниц" />

                <TextInput
                  id="counter"
                  placeholder="1234"
                  className="mt-1 block w-full py-3 rounded-xl"
                  value={data.counter}
                  onChange={(e) => setData("counter", e.target.value)}
                  required
                  isFocused
                  autoComplete="counter"
                />

                <InputError className="mt-2" message={errors.counter} />
              </div>
              <div>
                <InputLabel htmlFor="number" value="Номер" />

                <TextInput
                  type="number"
                  id="number"
                  placeholder="5873"
                  className="mt-1 block w-full py-3 rounded-xl"
                  pattern="\d*"
                  value={data.number}
                  onChange={(e) => setData("number", e.target.value)}
                  required
                  isFocused
                  autoComplete="number"
                />

                <InputError className="mt-2" message={errors.number} />
              </div>
              <div>
                <InputLabel htmlFor="location" value="Локация" />

                <TextInput
                  id="location"
                  placeholder="318"
                  className="mt-1 block w-full py-3 rounded-xl"
                  value={data.location}
                  onChange={(e) => setData("location", e.target.value)}
                  required
                  isFocused
                  autoComplete="location"
                />

                <InputError className="mt-2" message={errors.location} />
              </div>
              <div>
                <InputLabel htmlFor="status" value="Статус" />

                <TextInput
                  id="status"
                  placeholder="В эксплуатации"
                  className="mt-1 block w-full py-3 rounded-xl"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  required
                  isFocused
                  autoComplete="status"
                />

                <InputError className="mt-2" message={errors.status} />
              </div>

              {/* <div className="mb-8">
                <InputLabel htmlFor="description" value="Description" />

                <TextAreaInput
                  id="description"
                  rows={6}
                  className="mt-1 block w-full"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError className="mt-2" message={errors.description} />
              </div> */}

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
