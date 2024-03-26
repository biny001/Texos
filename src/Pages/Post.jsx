import React from "react";
import PostInput from "@/ui/PostInput";

const Post = () => {
  return (
    <div className=" h-full w-full flex flex-col items-center">
      <h3>upload any image</h3>
      <PostInput />
    </div>
  );
};

export default Post;
