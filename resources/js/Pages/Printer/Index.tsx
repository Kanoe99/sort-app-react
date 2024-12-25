import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Printer, PageProps, PaginatedData } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";
import { Placeholder } from "./Partials/Placeholder";
import { Tags } from "@/Components/Tags";
import { PrintersMain } from "@/Components/PrintersMain";

export default function Index({ auth, printers, aprinters, tags }: PageProps) {
  // usePoll(3000);

  return (
    <AuthenticatedLayout header={""}>
      <Head title="Штуки " />

      {/* {can(auth.user, "manage_features") && (
        <div className="mb-8">
          <Link
            href={route("feature.create")}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
          >
            Create New Printer
          </Link>
        </div>
      )} */}

      <div className="flex flex-col gap-5 w-full">
        {/* First pair */}
        <div className="flex gap-5">
          <div className="w-2/3">
            {tags.length === 0 ? (
              <Placeholder>Тут нет тегов ಠ_ಠ</Placeholder>
            ) : (
              <Tags tags={tags} />
            )}
          </div>
          <div className="w-1/3 select-none">
            <Placeholder>Тут будет поиск</Placeholder>
          </div>
        </div>

        {/* Second pair */}
        <div className="flex gap-5">
          <div className="w-2/3">
            {printers.data.length === 0 ? (
              <Placeholder>Тут нет принтеров (╯°□°）╯︵ ┻━┻</Placeholder>
            ) : (
              <PrintersMain />
            )}
          </div>
          <div className="w-1/3 pl-3 select-none">
            <Placeholder>Требуют внимания</Placeholder>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
