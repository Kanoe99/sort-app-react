import { Feature } from "@/types";
import TextAreaInput from "./TextAreaInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";
import { can } from "@/helpers";

const NewCommentForm = ({ feature }: { feature: Feature }) => {
  const user = usePage().props.auth.user;

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

  if (!can(user, "manage_comments")) {
    return (
      <div className="py-3 grid place-items-center rounded-md bg-[rgba(17,24,39,0.66)] border-2 my-5 font-bold text-xl text-gray-500 border-gray-700">
        You don't have the permission to leave comments
      </div>
    );
  }

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

export { NewCommentForm };
