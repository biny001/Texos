import React from "react";
import PostInput from "@/ui/PostInput";

const Post = () => {
  return (
    <div className=" h-full w-full  space-y-4 flex flex-col items-center px-4 pt-4">
      <h3 className=" w-full text-slate-400   text-lg ">Upload image</h3>
      <PostInput />
    </div>
  );
};

export default Post;
