import { formatTimeDifference } from "@/utils/utility";
import { useLikePost } from "@/lib/react-query/queryAndMutations";
import { useContext, useState } from "react";

import { AuthContext } from "@/Context/AuthProvider";

const PostCard = ({ post }) => {
  // console.log(post);

  const [like, setLike] = useState(false);
  const { mutate: likepost, isPending } = useLikePost();
  const { info } = useContext(AuthContext);

  const handleLike = async () => {
    const data = {
      postId: post.$id,
      userId: info?.accountId,
    };
    try {
      let checklike = await likepost(data);

      console.log("Post liked/unliked successfully", checklike);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <li
      className=" w-full "
      key={post.$id}
    >
      <div className=" w-full space-y-2">
        <div className=" flex items-center  justify-between  text-sm  text-slate-300">
          <div className=" flex items-center gap-1">
            <img
              className=" w-6 h-6 rounded-full"
              src={post.creator.avatarUrl}
              alt="user avatar"
            />
            <p>{post.creator.name}</p>
          </div>
          <p className="text-[10px] text-slate-400">
            {formatTimeDifference(post.$createdAt)}
          </p>
        </div>

        {/* post imagecard component */}
        <div className=" w-full px-7 text-sm text-slate-200 flex flex-col  space-y-2  ">
          <div className=" flex items-center space-x-3">
            <p className=" py-1"> {post.caption} </p>
            <p className=" text-slate-500 "> #{post.tags} </p>
          </div>
          <div className=" flex flex-col items-center justify-center  ">
            <img
              className=" w-96  h-96 object-cover rounded-xl"
              src={post.imageUrl}
              alt="post"
            />
          </div>
          <div className=" flex items-center justify-between py-1 px-2">
            <button
              onClick={handleLike}
              className="text-slate-200 flex justify-center gap-1.5 items-start relative"
            >
              {isPending ? (
                <img src="/icons/loader.svg" />
              ) : (
                <img
                  className="h-full"
                  src="/icons/like.svg"
                />
              )}

              <span className=" text-xs">
                {post?.userlike?.length > 0 ? post?.userlike.length : ""}
              </span>
            </button>

            <button className=" text-slate-200">
              {" "}
              <img src={" /icons/bookmark.svg"} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
