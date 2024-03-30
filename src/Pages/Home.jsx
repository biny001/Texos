import { useGetPost } from "@/lib/react-query/queryAndMutations";
import PostCard from "@/ui/PostCard";
import { formatTimeDifference } from "@/utils/utility";
import React from "react";

const Home = () => {
  const { data: posts, isLoading } = useGetPost();

  if (isLoading) return <div>Loading...</div>;
  console.log("posts", posts);
  return (
    <div className=" h-full w-full">
      <ul className=" grid grid-cols-1 px-5 space-y-3 ">
        {posts?.map((post) => {
          return (
            <PostCard
              key={post?.$id}
              post={post}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
