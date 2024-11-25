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
            <Link href={route("feature.show", feature)}>{feature.name}</Link>
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
                className="mt-4 bg-gray-900 rounded-md px-2 py-1"
                onClick={toggleReadMore}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            feature.description
          )}
        </div>
        <div>
          <FeatureActionsDropdown feature={feature} />
        </div>
      </div>
    </div>
  );
};

export { FeatureItem };
