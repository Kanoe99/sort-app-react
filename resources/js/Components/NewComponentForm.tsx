import { Feature } from "@/types";
import TextAreaInput from "./TextAreaInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";

const NewComponentForm = ({ feature }: { feature: Feature }) => {
  const { data, setData, post, processing } = useForm({
    comment: "",
  });
  const createComment: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("comment.store", feature.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData("comment", ""),
    });
  };

  return (
    <form
      onSubmit={createComment}
      className="flex items-center gap-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
    >
      <TextAreaInput
        rows={1}
        value={data.comment}
        onChange={(e) => setData("comment", e.target.value)}
        placeholder="Your comment"
      />
      <PrimaryButton disabled={processing}>Comment</PrimaryButton>
    </form>
  );
};

export { NewComponentForm };
