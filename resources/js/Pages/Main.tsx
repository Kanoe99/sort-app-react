import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Main() {
  return (
    <AuthenticatedLayout>
      <Head title="Главная" />
    </AuthenticatedLayout>
  );
}
