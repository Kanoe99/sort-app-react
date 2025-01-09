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

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <div className="w-[calc(60vw_-_0.25rem)]">
            {tags.length === 0 ? (
              <Placeholder additionalClasses="flex-1">
                Тут нет тегов ಠ_ಠ
              </Placeholder>
            ) : (
              <Tags tags={tags} />
            )}
          </div>
          <div className="w-1/3 select-none">
            <Search />
          </div>
        </div>

        <div className="w-full h-full flex flex-col">
          {printers.data.length === 0 ? (
            <div className="flex-1">
              <Placeholder additionalClasses="flex-1 h-[calc(100vh_-_16rem)]">
                Тут нет принтеров (╯°□°）╯︵ ┻━┻
              </Placeholder>
            </div>
          ) : (
            <PrintersMain />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
