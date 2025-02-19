import { Feature } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import FeatureActionsDropdown from "@/Components/FeatureActionsDropdown";
import FeatureUpvoteDownvote from "@/Components/FeatureUpvoteDownvote";

export default function FeatureItem({ feature }: { feature: Feature }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 overflow-hidden shadow-sm sm:rounded-lg bg-gray-800">
      <div className="p-6 text-gray-100 flex gap-8">
        <FeatureUpvoteDownvote feature={feature} />
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            <Link prefetch href={route("feature.show", feature)}>
              {feature.name}
            </Link>
          </h2>
          {(feature.description || "").length > 200 && (
            <>
              <p>
                {isExpanded
                  ? feature.description
                  : `${(feature.description || "").slice(0, 200)}...`}
              </p>

              <button
                onClick={toggleReadMore}
                className="text-amber-500 hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          )}
          {(feature.description || "").length <= 200 && (
            <p>{feature.description}</p>
          )}

          <div className="py-4">
            <Link
              prefetch
              href={route("feature.show", feature)}
              className="inline-flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
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
}
