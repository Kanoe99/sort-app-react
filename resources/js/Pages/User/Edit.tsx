import { FeatureItem } from "@/Components/FeatureItem";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Edit({ feature }: { feature: Feature }) {
  const { data, setData, errors, put, processing } = useForm({
    name: feature.name,
    description: feature.description,
  });

  const updateFeature: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("feature.update", feature.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Feature <b className="underline">{feature.name}</b>
        </h2>
      }
    >
      <Head title={"Edit Feature " + feature.name} />
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 flex gap-8 text-gray-900 dark:text-gray-100">
          <form onSubmit={updateFeature} className="w-full flex flex-col gap-8">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                id="description"
                className="mt-1 block w-full"
                value={data.description ?? ""}
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
