import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 shadow sm:rounded-lg sm:p-8 bg-black border border-white/20">
      {children}
    </div>
  );
};

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-200">
          Профиль
        </h2>
      }
    >
      <Head title="Профиль" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <Wrapper>
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </Wrapper>

          <Wrapper>
            <UpdatePasswordForm className="max-w-xl" />
          </Wrapper>

          <Wrapper>
            <DeleteUserForm className="max-w-xl" />
          </Wrapper>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
