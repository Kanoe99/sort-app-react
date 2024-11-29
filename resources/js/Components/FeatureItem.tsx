import { Feature } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FeatureActionsDropdown } from "./FeatureActionsDropdown";
import FeatureUpvoteDownvote from "./FeatureUpvoteDownvote";

const FeatureItem = ({ feature }: { feature: Feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 flex gap-8 text-gray-900 dark:text-gray-100">
        <FeatureUpvoteDownvote feature={feature} />
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            <Link prefetch href={route("feature.show", feature)}>
              {feature.name}
            </Link>
          </h2>
          {(feature.description || "").length > 200 ? (
            <>
              <p>
                {isExpanded
                  ? feature.description ?? ""
                  : (feature.description ?? "").slice(0, 200) +
                    (feature.description !== null ? "..." : "no description")}
              </p>
              <button
                className="py-[2px] pr-2 text-amber-500 border-b border-dashed border-amber-500 mb-4"
                onClick={toggleReadMore}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            feature.description
          )}
          <div>
            <Link
              prefetch
              href={route("feature.show", feature)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
            >
              Comments
            </Link>
          </div>
        </div>
        <div>
          <FeatureActionsDropdown feature={feature} />
        </div>
      </div>
    </div>
  );
};

export { FeatureItem };
