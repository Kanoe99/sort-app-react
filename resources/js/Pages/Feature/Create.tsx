import { FeatureItem } from "@/Components/FeatureItem";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Show({ feature }: { feature: Feature }) {
  const { data, setData, errors, post } = useForm({
    name: "",
    description: "",
  });

  const createFeature: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("feature.store"), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create New Feature
        </h2>
      }
    >
      <Head title="Create New Feature" />
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 flex gap-8 text-gray-900 dark:text-gray-100">
          <form onSubmit={createFeature}>
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
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
