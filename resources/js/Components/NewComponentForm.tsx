import { Feature } from "@/types";
import TextAreaInput from "./TextAreaInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const NewComponentForm = ({ feature }: { feature: Feature }) => {
  const { data, setData, post, processing } = useForm({
    comment: "",
  });
  const createComment: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("comment.store"), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData("comment", ""),
    });
  };

  return (
    <form
      onSubmit={createComment}
      className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
    >
      <div>
        <TextAreaInput rows={1} />
      </div>
    </form>
  );
};

export { NewComponentForm };
