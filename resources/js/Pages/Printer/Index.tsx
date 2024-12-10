import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Printer, PageProps, PaginatedData, Feature } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";

export default function Index({
  auth,
  printers,
  features,
}: PageProps<{
  printers: PaginatedData<Printer>;
  features: PaginatedData<Feature>;
}>) {
  usePoll(3000);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Принтеры
        </h2>
      }
    >
      <Head title="Штуки " />

      {can(auth.user, "manage_features") && (
        <div className="mb-8">
          <Link
            href={route("feature.create")}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
          >
            Create New Printer
          </Link>
        </div>
      )}
      {printers.map((printer) => (
        <div className="text-white">{printer.model}</div>
        // <FeatureItem printer={printer} key={printer.id} />
      ))}
      {features.map((feature) => (
        <div className="text-white">{feature.model}</div>
        // <FeatureItem printer={printer} key={printer.id} />
      ))}
    </AuthenticatedLayout>
  );
}
