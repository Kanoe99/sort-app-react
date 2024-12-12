import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Printer, PageProps, PaginatedData } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";
import { Placeholder } from "./Partials/Placeholder";
import { Tags } from "@/Components/Tags";
import { Carousel } from "@/Components/Carousel";

export default function Index({
  auth,
  printers,
  aprinters,
  tags,
}: PageProps<{
  printers: PaginatedData<Printer>;
  aprinters: PaginatedData<Printer>;
}>) {
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

      <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
        {/* First pair */}
        <div className="col-span-2 row-start-1">
          {tags.length === 0 ? (
            <Placeholder>Тут нет тегов ಠ_ಠ</Placeholder>
          ) : (
            <Tags tags={tags} />
          )}
        </div>
        <div className="col-span-1 row-start-1">
          <Placeholder>Тут будет поиск</Placeholder>
        </div>

        {/* Second pair */}
        <div className="col-span-2 row-start-2">
          {printers.length === 0 ? (
            <Placeholder>Тут нет принтеров (╯°□°）╯︵ ┻━┻</Placeholder>
          ) : (
            <Carousel />
          )}
        </div>
        <div className="col-span-1 row-start-2">
          <Placeholder>Требуют внимания</Placeholder>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
