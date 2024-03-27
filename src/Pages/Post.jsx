import React, { useContext } from "react";
import PostInput from "@/ui/PostInput";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/Context/AuthProvider";
import { useCreatePost } from "@/lib/react-query/queryAndMutations";

const Post = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { info } = useContext(AuthContext);
  const { mutate: createPost, isPending } = useCreatePost();

  async function onSubmit(value) {
    const data = {
      ...value,
      creator: info?.accountId,
    };
    const post = await createPost(data);
  }
  return (
    <div className="  h-full w-full  space-y-1 flex flex-col items-center px-4 pt-4">
      <h3 className=" w-full text-slate-400   text-lg ">Post</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full  h-[130vh]  space-y-3"
      >
        <div>
          <label
            className="text-slate-400"
            htmlFor="caption"
          >
            Caption
          </label>
          <input
            className="post-input "
            type="text"
            id="caption"
            {...register("caption")}
          />
        </div>
        <PostInput register={(name, value) => register(name, { value })} />
        <div>
          <label
            className="text-slate-400"
            htmlFor="tag"
          >
            tag
          </label>
          <input
            className="post-input"
            type="text"
            id="tag"
            {...register("tags")}
          />
        </div>
        <div>
          <label
            className="text-slate-400"
            htmlFor="location"
          >
            location
          </label>
          <input
            className="post-input"
            type="text"
            id="location"
            {...register("location")}
          />
        </div>
        <div className=" flex w-full gap-4 py-1  ">
          <button className=" bg-black  w-full py-2 px-3 rounded-lg">
            cancel
          </button>
          <button className="  bg-primary-grey  w-full py-2 px-3 rounded-lg ">
            post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
