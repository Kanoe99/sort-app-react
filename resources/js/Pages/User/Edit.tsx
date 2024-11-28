import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Radio from "@/Components/Radio";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, ChangeEvent } from "react";

export default function Edit({
  roles,
  user,
  roleLabels,
}: {
  roles: any;
  user: User;
  roleLabels: Record<string, string>;
}) {
  const { data, setData, errors, put, processing } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles,
  });

  const updateUser: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("user.update", user.id), {
      preserveScroll: true,
    });
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setData("roles", [e.target.value]);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User <b className="underline">{user.name}</b>
        </h2>
      }
    >
      <Head title={"Edit User " + user.name} />
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 flex gap-8 text-gray-900 dark:text-gray-100">
          <form onSubmit={updateUser} className="w-full flex flex-col gap-8">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                disabled
                id="name"
                className="mt-1 block w-full !bg-gray-800 !text-gray-500"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                autoComplete="email"
              />

              <InputError className="mt-2" message={errors.email} />
            </div>
            <div className="mb-8">
              <InputLabel value="Role" />
              {roles.map((role: any, index: number) => (
                <label className="flex items-center" key={role.id}>
                  <Radio
                    className="my-1"
                    value={role.name}
                    checked={data.roles.includes(role.name)}
                    name="roles"
                    onChange={handleRoleChange}
                  />
                  <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                    {roleLabels[role.name]}
                  </span>
                </label>
              ))}
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
