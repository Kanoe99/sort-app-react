import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Printer, PageProps, PaginatedData } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";
import { Placeholder } from "./Partials/Placeholder";
import { Tags } from "@/Components/Tags";
import { PrintersMain } from "@/Components/PrintersMain";
import { Search } from "@/Components/Search";

export default function Index({ auth, printers, aprinters, tags }: PageProps) {
  // usePoll(3000);

  return (
    <AuthenticatedLayout header={""}>
      <Head title="Штуки " />

      {can(auth.user, "manage_features") && (
        <div className="mb-8">
          <Link
            href={route("feature.create")}
            className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-white focus:bg-white focus:ring-offset-gray-800 active:bg-gray-300"
          >
            Create New Printer
          </Link>
        </div>
      )}

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
            <Search />
          </div>
        </div>

        {/* Second pair */}
        <div className="flex gap-5">
          <div className="w-full">
            {printers.data.length === 0 ? (
              <Placeholder>Тут нет принтеров (╯°□°）╯︵ ┻━┻</Placeholder>
            ) : (
              <PrintersMain />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
