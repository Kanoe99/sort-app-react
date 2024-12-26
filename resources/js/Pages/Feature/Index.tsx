import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Feature, PageProps, PaginatedData } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";

export default function Index({
  auth,
  features,
}: PageProps<{ features: PaginatedData<Feature> }>) {
  usePoll(3000);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-200">
          Features
        </h2>
      }
    >
      <Head title="Штуки" />

      {can(auth.user, "manage_features") && (
        <div className="mb-8">
          <Link
            href={route("feature.create")}
            className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-white focus:bg-white focus:ring-offset-gray-800 active:bg-gray-300"
          >
            Create New Feature
          </Link>
        </div>
      )}
      {features.data.map((feature) => (
        <FeatureItem feature={feature} key={feature.id} />
      ))}
    </AuthenticatedLayout>
  );
}
