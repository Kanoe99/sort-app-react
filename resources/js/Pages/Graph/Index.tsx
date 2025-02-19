import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Printer } from "@/types";
import { ByCounter } from "./ByCounter";
import { ByType } from "./ByType";

export default function Index({ printers }: { printers: Printer[] }) {
  return (
    <AuthenticatedLayout header={""}>
      <Head title="Графики" />
      <section className="flex flex-wrap gap-80 mx-auto justify-center">
        <ByCounter printers={printers} />
        <ByType printers={printers} />
      </section>
    </AuthenticatedLayout>
  );
}
