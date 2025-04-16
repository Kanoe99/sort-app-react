import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Placeholder } from "./Placeholder";
import { Tags } from "@/Components/Tags";
import { PrintersMain } from "@/Pages/Printer/Components/PrintersMain";
import { Search } from "@/Components/Search";
import { useState } from "react";

export default function Index({ printers, tags }: PageProps) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleIsSearchMode = (isSearchMode: boolean) => {
    setIsSearchMode(isSearchMode);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AuthenticatedLayout header={""}>
      <Head title="Главная " />

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <div className="w-[calc(60vw_-_0.25rem)]">
            {tags.length === 0 ? (
              <Placeholder additionalClasses="flex-1">
                Тут нет тегов ಠ_ಠ
              </Placeholder>
            ) : (
              <Tags
                tags={tags}
                searchQuery={searchQuery}
                isSearchMode={isSearchMode}
                handleIsSearchMode={handleIsSearchMode}
                handleSearchQuery={handleSearchQuery}
              />
            )}
          </div>
          <div className="w-1/3 select-none">
            <Search
              handleIsSearchMode={handleIsSearchMode}
              handleSearchQuery={handleSearchQuery}
            />
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
            <PrintersMain
              isSearchMode={isSearchMode}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
